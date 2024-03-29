import redis, { RedisClient } from 'redis';
import  Redlock from 'redlock';
import  { promisify } from 'util'
import config from '../config/config.json';
import { IGame, IResult, ISwipe } from '../types/game';
import axios, { AxiosResponse } from 'axios';
import { ApiService } from './apiService';
export class GameService {

   private static instance: GameService;
   private client: RedisClient;
   private apiService: ApiService;
   private redlock: Redlock;
   private getAsync: any;
   private setAsync: any;

   private constructor() {
      this.client = redis.createClient(parseInt(process.env.DB_PORT ?? ''), process.env.DB_IP);
      this.redlock = new Redlock([this.client], {
         retryDelay: 50,
         retryJitter: 50
      });
      /**
       * Create async versions of the redis getters
       * and setters
       */
      this.apiService = ApiService.getInstance();
      this.getAsync = promisify(this.client.get).bind(this.client);
      this.setAsync = promisify(this.client.set).bind(this.client);
   }

   public static getInstance(): GameService {

      if (!GameService.instance) {
         GameService.instance = new GameService();
      }
      return GameService.instance;
   }
   ///////////////////////////////////////////////////////////////////////////
   ////////////////////////////// CORE METHODS ///////////////////////////////
   ///////////////////////////////////////////////////////////////////////////

   public async connect(gameId: string): Promise<IGame> {
      const resource = 'locks:' + gameId;
      const lock = await this.redlock.lock(resource, 1000);
      try {
         const game = await this.getGame(gameId);
         this.checkStatus(game);
         /**
          * If game.swipes doesn't exist yet, grab the
          * first page of results and add it
          */
         if (!game.swipes) {
            game.swipes = await this.apiService.getSwipes(game);
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

         /**
          * If all players have left, and game
          * isn't playing, delete the game
          */
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

      /**
       * Check if game.swipes.length has anything in it
       * If it doesn't, this likely means that there are
       * no more results left to return. In this case, 
       * to avoid hitting the movieDb api, just return 
       * empty here
       */

      const game = await this.getGame(gameId);
      if (game.swipes.length == 0) {
         return [];
      }
      ++game.page;
      const newSwipes = await this.apiService.getSwipes(game);

      const resource = 'locks:' + gameId;
      const lock = await this.redlock.lock(resource, 1000)
      try {
         this.checkStatus(game);

         for (const swipe of newSwipes) {
            if (game.swipes.find((s) => swipe.id == s.id) != undefined) {
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
   


   public async vote(gameId: string, swipeId: number, vote: 'yes' | 'no', revote: boolean): Promise<Array<ISwipe>> {

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
               if (revote) --game.swipes[swipeIdx].numDislikes;
            } else {
               ++game.swipes[swipeIdx].numDislikes;
               if (revote) --game.swipes[swipeIdx].numLikes;
            }
         } else {
            throw new Error('Didn\'t find this swipe in this game');
         }
         
         /**
          * Increment the page for the next
          * time more swipes are requested
          */

         await this.setGame(gameId, game);
         lock.unlock();

         return game.swipes;
      } 
      catch(err: any) {
         lock.unlock();
         throw new Error(err.message);
      }
   }
   ///////////////////////////////////////////////////////////////////////////
   ///////////////////////// PRIVATE HELPER METHODS //////////////////////////
   ///////////////////////////////////////////////////////////////////////////

   private async getGame(gameId: string): Promise<IGame> {
      return await this.getAsync(gameId)
      .then((reply: string) => {
         if (!reply) {
            console.error('In getGame');
            console.error(reply);
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

   private checkStatus(game: IGame): void {
      if (!game.playing) {
         throw new Error('Game is still in lobby');
      }
   }
}

