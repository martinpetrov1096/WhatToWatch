import { Lobby } from './lobbyModel';


export interface Result {
   adult?: boolean;
   backdrop_path?: string;
   genre_ids?: Array<number>;
   id?: number;
   original_language?: string;
   original_title?: string;
   overview?: string;
   popularity?: number;
   poster_path?: string;
   release_date?: string;
   title?: string;
   video?: boolean;
   vote_average?: number;
   vote_count?: number;
}

export interface Swipe extends Result {
   numLikes: number;
   numDislikes: number;
}
export interface Game extends Lobby{
   page: number;
   swipes: Array<Swipe>;
}