
export interface ILobby {

   id: string;
   playing: boolean;
   type: 'movie' | 'tv';
   numPlayers: number;
   genres: Array<number>;
   minRating: number;
}


