
export interface Game {

   id: string;
   playing: boolean;
   type: 'movie' | 'tv-show';
   numPlayers: number;
   genre: Array<number> | null;
   minRating: number | null;
   matches: Array<Match> | null;
}


export interface Match {
   numMatched: number;
   id: number;
}