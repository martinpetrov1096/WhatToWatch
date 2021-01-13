import redis, { RedisClient } from 'redis';
import  Redlock, { Lock } from 'redlock';
import crypto  from 'crypto';
import  { promisify } from 'util'
import config from '../config/config';
import { ILobby } from '../models/lobby';
import { IGame, IResult, ISwipe } from '../models/game';
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

   public async connect(gameId: string): Promise<IGame> {
      const resource = 'locks:' + gameId;
      const lock = await this.redlock.lock(resource, 1000);
      try {
         const game = await this.getGame(gameId);
         this.checkStatus(game);

         /* If game.swipes isn't yet an array, make it one */
         if (!game.swipes) {
            const results = await this.getResults(game);
               game.swipes = results.map((res: IResult): ISwipe => {
               const swipe = res as ISwipe;
               swipe.numLikes = 0;
               swipe.numDislikes = 0;
               return swipe;
            });
         }

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

   public async checkGame(gameId: string): Promise<boolean> {
      const resource = 'locks:' + gameId;
      const lock = await this.redlock.lock(resource, 1000);

      try {
         const game = await this.getGame(gameId);
         lock.unlock();
         return game.id == gameId && game.playing;
      }
      catch(err: any) {
         lock.unlock();
         return false;
      }
   }

   public async disconnect(gameId: string): Promise<IGame> {
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

   public async genSwipes(gameId: string): Promise<Array<ISwipe>> {

      const game = await this.getGame(gameId);
      const results = await this.getResults(game);

      const resource = 'locks:' + gameId;
      const lock = await this.redlock.lock(resource, 1000)
      try {
         this.checkStatus(game);
         const newSwipes: Array<ISwipe> = results.map((res: IResult): ISwipe => {
            const swipe = res as ISwipe;
            swipe.numLikes = 0;
            swipe.numDislikes = 0;
            return swipe;
         });

         for (const swipe of newSwipes) {
            console.log(swipe.id);
            if (game.swipes.find((s) => swipe.id == s.id) != undefined) {
               console.log('problem')
               throw new Error('Swipes already exist');
            }
         }
         game.swipes = game.swipes.concat(newSwipes);
         
         await this.setGame(gameId, game);
         lock.unlock();
         return newSwipes;
      }
      catch(err: any) {
         lock.unlock();
         throw new Error(err.message);
      }
   }

   public async vote(gameId: string, swipeId: number, vote: 'yes' | 'no'): Promise<Array<ISwipe>> {

      const resource = 'locks:' + gameId;
      const lock = await this.redlock.lock(resource, 1000);
      try {
         const game = await this.getGame(gameId);
         
         /**
          * If the value is in the map, increment
          * its vote count. Otherwise, throw an error
          */
         const swipeIdx = game.swipes.findIndex((swipe) => swipe.id == swipeId);
         if (swipeIdx != -1) {            
            if (vote == 'yes') {
               ++game.swipes[swipeIdx].numLikes;
            } else {
               ++game.swipes[swipeIdx].numDislikes;
            }
         } else {
            throw new Error('Didn\'t find this swipe in this game');
         }
         
         /**
          * Increment the page for the next
          * time more swipes are requested
          */
         ++game.page;
         await this.setGame(gameId, game);
         lock.unlock();

         return game.swipes;
      } 
      catch(err: any) {
         lock.unlock();
         throw new Error(err.message);
      }
   }


   private async getGame(gameId: string): Promise<IGame> {
      return await this.getAsync(gameId)
      .then((reply: string) => {
         if (!reply) {
            throw new Error('Couldn\'t find game with this id');
         }
         return JSON.parse(reply);
      });
   }

   private async setGame(gameId: string, game: IGame): Promise<void> {
      this.setAsync(gameId, JSON.stringify(game))
         .then((reply: any) => {
            if (reply != 'OK') throw new Error('Couldn\'t update lobby');
         });
   }


   private async getResults(game: IGame): Promise<Array<IResult>> {
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

         return res.data.results as Array<IResult>;
      });
      return results;
   }

   private checkStatus(game: IGame): void {
      if (!game.playing) {
         throw new Error('Game is still in lobby');
      }
   }
}

