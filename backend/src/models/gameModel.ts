import { Lobby } from './lobbyModel';

export type Swipes = Map<number, number>;
export interface Game extends Lobby{

   page: number;
   swipes: Swipes;

}

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

