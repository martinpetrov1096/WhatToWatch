
export interface ILobby {

   id: string;
   playing: boolean;
   type: 'movie' | 'tv';
   numPlayers: number;
   genre: Array<number>;
   minRating: number;
}


