import redis, { RedisClient } from 'redis';
import  Redlock from 'redlock';
import config from '../config/config';
import crypto  from 'crypto';
import { Game } from '../models/game';
import  { promisify } from 'util'


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


   public async join(gameId: string): Promise<Game> {
      const resource = 'locks:' + gameId;
      const lock = await this.redlock.lock(resource, 1000);
      const game = await this.getAsync(gameId)
         .then((reply: string) => {
            if (!reply) throw new Error('Couldn\'t find game with this id');
            return JSON.parse(reply);
         });
         
      this.checkStatus(game);
      ++game.numPlayers;
      
      this.client.set(game.id, JSON.stringify(game), (err, reply) => {
         if (err) throw new Error('Couldn\'t update game');
         lock.unlock();
      });
      
      return game;
   }


   private checkStatus(game: Game): void {
      if (!game.playing) {
         throw new Error('Game has already started');
      }
   }
}

