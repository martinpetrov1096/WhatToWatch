import redis, { RedisClient } from 'redis';
import  Redlock from 'redlock';
import crypto  from 'crypto';
import  { promisify } from 'util'
import config from '../config/config';
import { Lobby } from '../models/lobbyModel';
import { Game, Results } from '../models/gameModel';
import axios from 'axios';
export class GameService {

   private static instance: GameService;
   private client: RedisClient;
   private redlock: Redlock;
   private getAsync: any;

   private constructor() {
      this.client = redis.createClient(config.db.port, config.db.ip);
      this.redlock = new Redlock([this.client], {
         retryDelay: 50,
         retryJitter: 50
      });
      this.getAsync = promisify(this.client.get).bind(this.client);
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
         const game = await this.getAsync(gameId)
            .then((reply: string) => {
               if (!reply) throw new Error('Couldn\'t find game with this id');
               return JSON.parse(reply);
            });
         this.checkStatus(game);


         if (game.numPlayers == 0) {
            game.page = 1;
            game.results = await this.getResults(game);
         }

         ++game.numPlayers;
         
         this.client.set(game.id, JSON.stringify(game), (err, reply) => {
            if (err) throw new Error('Couldn\'t update game');
            lock.unlock();
         });
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
         const game = await this.getAsync(gameId)
         .then((reply: string) => {
            if (!reply) {
               throw new Error('Couldn\'t find game with this id');
            }
            return JSON.parse(reply);
         });
         this.checkStatus(game);
         --game.numPlayers;    

         /* If all players have left, and game isn't playing, delete the game */
         if (game.numPlayers == 0 && game.playing) {
            this.client.del(game.id, () => {
               lock.unlock();
            });
         } else {
            this.client.set(game.id, JSON.stringify(game), (err, reply) => {
               if (err) throw new Error('Couldn\'t update game');
               lock.unlock();
            });
         }
         return game;
      }
      catch(err: any) {
         lock.unlock();
         throw new Error(err.message);
      }
   }

   private checkStatus(game: Game): void {

      if (!game.playing) {
         throw new Error('Game is still in lobby');
      }
   }

   private async getResults(game: Game): Promise<Results> {

      const params = {
         'api_key': config.movieDbApi.apiKey,
       /*  'with_genre': game.genre.toString(),
         'vote_average.gte': game.minRating
      */}
      let results = await axios.get(config.movieDbApi.discover + game.type, {
        params: params,
      }).then((res) => {

         if (res.status != 200) {
            throw new Error('MovieDb API is down');
         }
         return res.data;
      });

      return results;
   }
}

