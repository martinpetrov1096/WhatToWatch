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
   private setAsync: any;

   private constructor() {
      this.client = redis.createClient(config.db.port, config.db.ip);
      this.redlock = new Redlock([this.client], {
         retryDelay: 50,
         retryCount: 40,
         retryJitter: 50
      });
      this.getAsync = promisify(this.client.get).bind(this.client);
      this.setAsync = promisify(this.client.set).bind(this.client);
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
         const lobby = await this.getLobby(lobbyId);

         this.checkStatus(lobby);
         ++lobby.numPlayers;
         
         await this.setLobby(lobbyId, lobby);
         lock.unlock();
         return lobby;
      } 
      catch(err: any) {
         lock.unlock();
         throw new Error(err.message);
      }

   }

   public async checkLobby(lobbyId: string): Promise<boolean> {
      const resource = 'locks:' + lobbyId;
      const lock = await this.redlock.lock(resource, 1000);

      try {
         const lobby = await this.getLobby(lobbyId);
         lock.unlock();
         return lobby.id == lobbyId;
      }
      catch(err: any) {
         lock.unlock();
         return false;
      }

   }

   public async disconnect(lobbyId: string): Promise<Lobby> {
      const resource = 'locks:' + lobbyId;
      const lock = await this.redlock.lock(resource, 1000);
      try {
         const lobby = await this.getLobby(lobbyId);

         --lobby.numPlayers;    

         /* If all players have left, and game isn't playing, delete the lobby */
         if (lobby.numPlayers == 0 && !lobby.playing) {
            this.client.del(lobby.id, () => {
               lock.unlock();
            });
         } else {
            await this.setLobby(lobbyId, lobby);
            lock.unlock();
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
         const lobby = await this.getLobby(lobbyId);
         this.checkStatus(lobby);

         if (lobby.genre.indexOf(genre) == -1) {
            lobby.genre.push(genre);
         }
         await this.setLobby(lobbyId, lobby);
         lock.unlock();

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
         const lobby = await this.getLobby(lobbyId);
         this.checkStatus(lobby);

         const genreIdx = lobby.genre.indexOf(genre);
         if (genreIdx != -1) {
            lobby.genre.splice(genreIdx, 1);
         }
         await this.setLobby(lobbyId, lobby);
         lock.unlock();
         return lobby;
      }
      catch(err: any) {
         lock.unlock();
         throw new Error(err.message);
      }
   }

   public async changeType(lobbyId: string, type: 'movie' | 'tv'): Promise<Lobby> {

      const resource = 'locks:' + lobbyId;
      const lock = await this.redlock.lock(resource, 1000);
      try {
         const lobby = await this.getLobby(lobbyId);
         this.checkStatus(lobby);

         lobby.type = type;
         await this.setLobby(lobbyId, lobby);
         lock.unlock();
         
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
         const lobby = await this.getLobby(lobbyId);
         this.checkStatus(lobby);

         lobby.playing = true;
         await this.setLobby(lobbyId, lobby);
         lock.unlock();
         return lobby;
      }
      catch(err: any) {
         lock.unlock();
         throw new Error(err.message);
      }
      
   }

   private genlobbyId(): string {
      return (Math.random() + 1).toString(36).substring(2,7);
   }

   /**
    * Helper function that gets the lobby from redis
    * @param lobbyId The id of the lobby you wish to get
    */
   private async getLobby(lobbyId: string): Promise<Lobby> {
      return await this.getAsync(lobbyId)
      .then((reply: string) => {
         if (!reply) {
            throw new Error('Couldn\'t find game with this id');
         }
         return JSON.parse(reply);
      });
   }

   /**
    * Helper function that saves the lobby to redis
    * @lobbyId The id of the lobby
    * @lobby The version of the lobby you want saved
    */
   private async setLobby(lobbyId: string, lobby: Lobby): Promise<void> {
      this.setAsync(lobby.id, JSON.stringify(lobby))
         .then((reply: any) => {
            if (reply != 'OK') throw new Error('Couldn\'t update lobby');
         });
   }

   /**
    * Helper function to check if the lobby should
    * be accessed from lobbyService
    * @param lobby The lobby to check
    */
   private checkStatus(lobby: Lobby): void {
      if (lobby.playing) {
         throw new Error('game has already started');
      }
   }
}

