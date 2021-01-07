
export interface Lobby {

   id: string;
   playing: boolean;
   type: 'movie' | 'tv-show';
   numPlayers: number;
   genre: Array<number>;
   minRating: number;
}


export interface Match {
   numMatched: number;
   id: number;
}