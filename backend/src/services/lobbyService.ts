import redis, { RedisClient } from 'redis';
import  Redlock from 'redlock';
import config from '../config/config';
import crypto  from 'crypto';
import { Lobby } from '../models/lobbyModel';
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
         retryCount: 40,
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
    * Returns the id of the newly created lobby
    */
   public new(type: 'movie' | 'tv'): Lobby {

      const newlobby: Lobby = {
         id: this.genlobbyId(),
         playing: false,
         type: type,
         numPlayers: 0,
         genre: new Array<number>(),
         minRating: 0,
      }

      /* Add to redis, don't need to use lock here */
      this.client.set(newlobby.id, JSON.stringify(newlobby), (err, reply) => {
         if (err) throw err;
      });

      return newlobby;
   }

   public async connect(lobbyId: string): Promise<Lobby> {
      const resource = 'locks:' + lobbyId;
      const lock = await this.redlock.lock(resource, 1000);
      try {
         const lobby = await this.getAsync(lobbyId)
            .then((reply: string) => {
               if (!reply) throw new Error('Couldn\'t find lobby with this id');
               return JSON.parse(reply);
            });
            
         this.checkStatus(lobby);
         ++lobby.numPlayers;
         
         this.client.set(lobby.id, JSON.stringify(lobby), (err, reply) => {
            if (err) throw new Error('Couldn\'t update lobby');
            lock.unlock();
         });
         return lobby;
      } 
      catch(err: any) {
         lock.unlock();
         throw new Error(err.message);
      }

   }

   public async disconnect(lobbyId: string): Promise<Lobby> {
      const resource = 'locks:' + lobbyId;
      const lock = await this.redlock.lock(resource, 1000);
      try {
         const lobby = await this.getAsync(lobbyId)
         .then((reply: string) => {
            if (!reply) {
               throw new Error('Couldn\'t find lobby with this id');
            }
            return JSON.parse(reply);
         });
         --lobby.numPlayers;    

         /* If all players have left, and game isn't playing, delete the lobby */
         if (lobby.numPlayers == 0 && !lobby.playing) {
            this.client.del(lobby.id, () => {
               lock.unlock();
            });
         } else {
            this.client.set(lobby.id, JSON.stringify(lobby), (err, reply) => {
               if (err) throw new Error('Couldn\'t update lobby');
               lock.unlock();
            });
         }
         return lobby;
      }
      catch(err: any) {
         lock.unlock();
         throw new Error(err.message);
      }
   }


   public async addGenre(lobbyId: string, genre: number): Promise<Lobby> {

      const resource = 'locks:' + lobbyId;
      const lock = await this.redlock.lock(resource, 1000);
      try {
         const lobby = await this.getAsync(lobbyId)
            .then((reply: string) => {
               if (!reply) {
                  throw new Error('Couldn\'t find lobby with this id');
               }
               return JSON.parse(reply);
            });

         this.checkStatus(lobby);
         if (lobby.genre.indexOf(genre) == -1) {
            lobby.genre.push(genre);
         }
         
         this.client.set(lobby.id, JSON.stringify(lobby), (err, reply) => {
            if (err) throw new Error('Couldn\'t update lobby');
         });
         return lobby;
      }
      catch(err: any) {
         lock.unlock();
         throw new Error(err.message);
      }
   }

   public async delGenre(lobbyId: string, genre: number): Promise<Lobby> {

      const resource = 'locks:' + lobbyId;
      const lock = await this.redlock.lock(resource, 1000);
      try {
         const lobby = await this.getAsync(lobbyId)
            .then((reply: string) => {
               if (!reply) {
                  lock.unlock;
                  throw new Error('Couldn\'t find lobby with this id');
               }
               return JSON.parse(reply);
            });

         this.checkStatus(lobby);
         const genreIdx = lobby.genre.indexOf(genre);
         if (genreIdx != -1) {
            lobby.genre.splice(genreIdx, 1);
         }

         this.client.set(lobby.id, JSON.stringify(lobby), (err, reply) => {
            lock.unlock();
            if (err) throw new Error('Couldn\'t update lobby');
         });
         return lobby;
      }
      catch(err: any) {
         lock.unlock();
         throw new Error(err.message);
      }
   }

   public async changeType(lobbyId: string, type: 'movie' | 'tv-show'): Promise<Lobby> {

      const resource = 'locks:' + lobbyId;
      const lock = await this.redlock.lock(resource, 1000);
      try {
         const lobby = await this.getAsync(lobbyId)
            .then((reply: string) => {
               if (!reply) {
                  lock.unlock;
                  throw new Error('Couldn\'t find lobby with this id');
               }
               return JSON.parse(reply);
            });

         this.checkStatus(lobby);
         lobby.type = type;
         this.client.set(lobby.id, JSON.stringify(lobby), (err, reply) => {
            lock.unlock();
            if (err) throw new Error('Couldn\'t update lobby');
         });
         
      return lobby;
      }
      catch(err: any) {
         lock.unlock();
         throw new Error(err.message);
      }
   }

   public async start(lobbyId: string): Promise<Lobby> {

      const resource = 'locks:' + lobbyId;
      const lock = await this.redlock.lock(resource, 1000);
      try {
         const lobby = await this.getAsync(lobbyId)
         .then((reply: string) => {
            if (!reply) {
               lock.unlock;
               throw new Error('Couldn\'t find lobby with this id');
            }
            return JSON.parse(reply);
         });
   
         this.checkStatus(lobby);
         lobby.playing = true;
         this.client.set(lobby.id, JSON.stringify(lobby), (err, reply) => {
            if (err) throw new Error('Couldn\'t update lobby');
            lock.unlock();
         });
         return lobby;
      }
      catch(err: any) {
         throw new Error(err.message);
      }
      
   }

   private genlobbyId(): string {
      return crypto.randomBytes(8).toString('hex');
   }

   private checkStatus(lobby: Lobby): void {
      if (lobby.playing) {
         throw new Error('game has already started');
      }
   }
}

