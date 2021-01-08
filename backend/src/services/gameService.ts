import redis, { RedisClient } from 'redis';
import  Redlock, { Lock } from 'redlock';
import crypto  from 'crypto';
import  { promisify } from 'util'
import config from '../config/config';
import { Lobby } from '../models/lobbyModel';
import { Game, Result } from '../models/gameModel';
import axios, { AxiosResponse } from 'axios';
export class GameService {

   private static instance: GameService;
   private client: RedisClient;
   private redlock: Redlock;
   private getAsync: any;
   private setAsync: any;

   private constructor() {
      this.client = redis.createClient(config.db.port, config.db.ip);
      this.redlock = new Redlock([this.client], {
         retryDelay: 50,
         retryJitter: 50
      });
      this.getAsync = promisify(this.client.get).bind(this.client);
      this.setAsync = promisify(this.client.set).bind(this.client);

   }

   public static getInstance(): GameService {

      if (!GameService.instance) {
         GameService.instance = new GameService();
      }
      return GameService.instance;
   }

   public async connect(gameId: string): Promise<Game> {
      const resource = 'locks:' + gameId;
      const lock = await this.redlock.lock(resource, 1000);
      try {
         const game = await this.getGame(gameId);

         this.checkStatus(game);

         ++game.numPlayers;
         
         await this.setGame(game.id, game);
         lock.unlock();

         return game;
      } 
      catch(err: any) {
         lock.unlock();
         throw new Error(err.message);
      }
   }

   public async disconnect(gameId: string): Promise<Game> {
      const resource = 'locks:' + gameId;
      const lock = await this.redlock.lock(resource, 1000);
      try {
         const game = await this.getGame(gameId);

         this.checkStatus(game);
         --game.numPlayers;    

         /* If all players have left, and game isn't playing, delete the game */
         if (game.numPlayers == 0 && game.playing) {
            this.client.del(game.id, () => {
               lock.unlock();
            });
         } else {
            await this.setGame(game.id, game);
            lock.unlock();
         }
         return game;
      }
      catch(err: any) {
         lock.unlock();
         throw new Error(err.message);
      }
   }

   public async genSwipes(gameId: string): Promise<Array<Result>> {

      const game = await this.getGame(gameId);
      const results = await this.getResults(game);

      const resource = 'locks:' + gameId;
      const lock = await this.redlock.lock(resource, 1000)
      try {
         this.checkStatus(game);

         results.forEach(async(result) => {
            /* Mostly to make typescript happy */
            if (result.id == undefined) {
               return;
            }
            /* If the result isn't already in the map, add it */
            if (game.swipes.get(result.id) == -1) {
               game.swipes.set(result.id, 0);
            }
         });
         await this.setGame(gameId, game);
         lock.unlock();
      }
      catch(err: any) {
         lock.unlock();
         throw new Error(err.message);
      }
      return results;
   }

   public async voteYes(gameId: string, swipeId: number): Promise<Game> {

      const resource = 'locks:' + gameId;
      const lock = await this.redlock.lock(resource, 1000);
      try {
         const game = await this.getGame(gameId);
         
         /**
          * If the value is in the map, increment
          * its vote count. Otherwise, throw an error
          */
         const numSwipes = game.swipes.get(swipeId);
         if (numSwipes) {
            game.swipes.set(swipeId, numSwipes+1);
         } else {
            throw new Error('Didn\'t find this swipe in this game');
         }
         await this.setGame(gameId, game);
         lock.unlock();

         return game;
      } 
      catch(err: any) {
         lock.unlock();
         throw new Error(err.message);
      }
   }


   private async getGame(gameId: string): Promise<Game> {
      return await this.getAsync(gameId)
      .then((reply: string) => {
         if (!reply) {
            throw new Error('Couldn\'t find game with this id');
         }
         return JSON.parse(reply);
      });
   }

   private async setGame(gameId: string, game: Game): Promise<void> {
      this.setAsync(gameId, JSON.stringify(game))
         .then((err: Error, reply: string) => {
            if (err) throw new Error('Couldn\'t update game');
         });
   }


   private async getResults(game: Game): Promise<Array<Result>> {
      /** */
      const params = {
         'api_key': config.movieDbApi.apiKey,
         'with_genre': game.genre.toString(),
         'vote_average.gte': game.minRating,
         'page': game.page
      }
      let results = axios.get(config.movieDbApi.discover + game.type, {
         params: params,
      }).then((res: AxiosResponse) => {
         if (res.status != 200) {
            throw new Error('Moviedb API Error');
         }
         return res.data as Array<Result>;
      });

      return results;
   }

   private checkStatus(game: Game): void {
      if (!game.playing) {
         throw new Error('Game is still in lobby');
      }
   }
}

