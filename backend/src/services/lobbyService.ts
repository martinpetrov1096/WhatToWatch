import redis, { RedisClient } from 'redis';
import  Redlock from 'redlock';
import config from '../config/config';
import crypto  from 'crypto';
import { Game } from '../models/game';
import  { promisify } from 'util'


export class LobbyService {

   private static instance: LobbyService;
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

   public static getInstance(): LobbyService {

      if (!LobbyService.instance) {
         LobbyService.instance = new LobbyService();
      }
      return LobbyService.instance;
   }

   /**
    * Returns the id of the newly created game
    */
   public new(type: 'movie' | 'tv-show'): Game {

      const newGame: Game = {
         id: type + '_' +  this.genGameId(),
         playing: false,
         type: type,
         numPlayers: 0,
         genre: null,
         minRating: null,
         matches: null
      }

      /* Add to redis, don't need to use lock here */
      this.client.set(newGame.id, JSON.stringify(newGame), (err, reply) => {
         if (err) throw err;
      });

      return newGame;
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

   public async addGenre(gameId: string, genre: number): Promise<Game> {

      const resource = 'locks:' + gameId;
      const lock = await this.redlock.lock(resource, 1000);
      const game = await this.getAsync(gameId)
         .then((reply: string) => {
            if (!reply) throw new Error('Couldn\'t find game with this id');
            return JSON.parse(reply);
         });

      this.checkStatus(game);
      if (game.genre == null) {
         game.genre = new Array<number>();
      }
      if (game.genre.indexOf(genre) == -1) {
         game.genre.push(genre);
      }
      
      this.client.set(game.id, JSON.stringify(game), (err, reply) => {
         if (err) throw new Error('Couldn\'t update game');
         lock.unlock();
      });
      
      return game;
   }

   public async removeGenre(gameId: string, genre: number): Promise<Game> {

      const resource = 'locks:' + gameId;
      const lock = await this.redlock.lock(resource, 1000);
      const game = await this.getAsync(gameId)
         .then((reply: string) => {
            if (!reply) throw new Error('Couldn\'t find game with this id');
            return JSON.parse(reply);
         });

      this.checkStatus(game);
      /* To avoid race case issues, just return as is if not found */
      if (game.genre == null) {
         return game;
      } 
      const genreIdx = game.genre.indexOf(genre);
      if (genreIdx != -1) {
         game.genre.splice(genreIdx, 1);
      }

      this.client.set(game.id, JSON.stringify(game), (err, reply) => {
         if (err) throw new Error('Couldn\'t update game');
         lock.unlock();
      });
      
      return game;
   }

   public async changeType(gameId: string, type: 'movie' | 'tv-show'): Promise<Game> {

      const resource = 'locks:' + gameId;
      const lock = await this.redlock.lock(resource, 1000);
      const game = await this.getAsync(gameId)
         .then((reply: string) => {
            if (!reply) throw new Error('Couldn\'t find game with this id');
            return JSON.parse(reply);
         });

      this.checkStatus(game);
      game.type = type;
      this.client.set(game.id, JSON.stringify(game), (err, reply) => {
         if (err) throw new Error('Couldn\'t update game');
         lock.unlock();
      });
      
      return game;
   }

   public async startGame(gameId: string): Promise<Game> {

      const resource = 'locks:' + gameId;
      const lock = await this.redlock.lock(resource, 1000);
      const game = await this.getAsync(gameId)
         .then((reply: string) => {
            if (!reply) throw new Error('Couldn\'t find game with this id');
            return JSON.parse(reply);
         });
   
      this.checkStatus(game);
      game.playing = true;
      this.client.set(game.id, JSON.stringify(game), (err, reply) => {
         if (err) throw new Error('Couldn\'t update game');
         lock.unlock();
      });
      
      return game;
   }

   private genGameId(): string {
      return crypto.randomBytes(8).toString('hex');
   }

   private checkStatus(game: Game): void {
      if (game.playing) {
         throw new Error('Game has already started');
      }
   }
}

