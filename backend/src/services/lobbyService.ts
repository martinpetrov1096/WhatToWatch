import redis, { RedisClient } from 'redis';
import  Redlock from 'redlock';
import config from '../config/config.json';
import crypto  from 'crypto';
import { ILobby } from '../models/lobby';
import  { promisify } from 'util'
import genres from '../config/genres.json';

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
   ///////////////////////////////////////////////////////////////////////////
   ////////////////////////////// CORE METHODS ///////////////////////////////
   ///////////////////////////////////////////////////////////////////////////

   /**
    * Returns the id of the newly created lobby
    */
   public new(type: 'movie' | 'tv'): ILobby {
      const newlobby: ILobby = {
         id: this.genlobbyId(),
         playing: false,
         type: type,
         numPlayers: 0,
         genres: new Array<number>(),
         minRating: 0,
      }
      /* Add to redis, don't need to use lock here */
      this.client.set(newlobby.id, JSON.stringify(newlobby), (err, reply) => {
         if (err) throw err;
      });
      return newlobby;
   }

   public async connect(lobbyId: string): Promise<ILobby> {
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
         return lobby.id == lobbyId && !lobby.playing;
      }
      catch(err: any) {
         lock.unlock();
         return false;
      }

   }

   public async disconnect(lobbyId: string): Promise<ILobby> {
      const resource = 'locks:' + lobbyId;
      const lock = await this.redlock.lock(resource, 1000);
      try {
         const lobby = await this.getLobby(lobbyId);
         --lobby.numPlayers;    

         /**
          * If all players have left, and game
          * isn't playing, delete the lobby
          */
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

   public async start(lobbyId: string): Promise<ILobby> {
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
   ///////////////////////////////////////////////////////////////////////////
   ///////////////////////////// FILTER METHODS //////////////////////////////
   ///////////////////////////////////////////////////////////////////////////

   public async addGenre(lobbyId: string, genre: number): Promise<ILobby> {
      const resource = 'locks:' + lobbyId;
      const lock = await this.redlock.lock(resource, 1000);
      try {
         const lobby = await this.getLobby(lobbyId);
         this.checkStatus(lobby);

         /**
          * Verify that genre isn't already in the list 
          * of genres, and that it is a valid genre
          */
         if (lobby.genres.indexOf(genre) == -1 && genres[lobby.type].map((g)=> g.id).includes(genre)) {
            lobby.genres.push(genre);
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

   public async delGenre(lobbyId: string, genre: number): Promise<ILobby> {
      const resource = 'locks:' + lobbyId;
      const lock = await this.redlock.lock(resource, 1000);
      try {
         const lobby = await this.getLobby(lobbyId);
         this.checkStatus(lobby);

         const genreIdx = lobby.genres.indexOf(genre);
         if (genreIdx != -1) {
            lobby.genres.splice(genreIdx, 1);
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

   public async changeMinRating(lobbyId: string, minRating: number): Promise<ILobby> {
      if (minRating < 1 || minRating > 9) {
         throw new Error('Rating must be a number between 1-9');
      }
      const resource = 'locks:' + lobbyId;
      const lock = await this.redlock.lock(resource, 1000);
      try {
         const lobby = await this.getLobby(lobbyId);
         this.checkStatus(lobby);
         lobby.minRating = minRating;

         await this.setLobby(lobbyId, lobby);
         lock.unlock();
         
         return lobby;
      }
      catch(err: any) {
         lock.unlock();
         throw new Error(err.message);
      }
   }

   public async changeType(lobbyId: string, type: 'movie' | 'tv'): Promise<ILobby> {
      const resource = 'locks:' + lobbyId;
      const lock = await this.redlock.lock(resource, 1000);
      try {
         const lobby = await this.getLobby(lobbyId);
         this.checkStatus(lobby);
         /**
          * Since genres are different for
          * movies and tv shows, need to 
          * reset genres
          */
         lobby.genres = [];
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
   ///////////////////////////////////////////////////////////////////////////
   ///////////////////////// PRIVATE HELPER METHODS //////////////////////////
   ///////////////////////////////////////////////////////////////////////////

   private genlobbyId(): string {
      return (Math.random() + 1).toString(36).substring(2,7);
   }

   /**
    * Helper function that gets the lobby from redis
    * @param lobbyId The id of the lobby you wish to get
    */
   private async getLobby(lobbyId: string): Promise<ILobby> {
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
   private async setLobby(lobbyId: string, lobby: ILobby): Promise<void> {
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
   private checkStatus(lobby: ILobby): void {
      if (lobby.playing) {
         throw new Error('game has already started');
      }
   }
}

