import axios from 'axios';
import config from '../config/config.json';

/**
 * This file essentially stores all of the requests
 * we need to make to the server. I also have several
 * non exported global variables here that act as the 
 * cache for requests that will be made frequently
 */

export interface Provider {
   id: number,
   name: string,
   iconUrl: string
}

let providers: Provider[];
export const getProviders = async (): Promise<Provider[]> => {

   /**
    * If providers haven't yet been gotten,
    * then grab them from the server, and
    * then cache them
    */
   if (!providers) {
      providers = await axios.get(config.server.apiUrl + 'info/providers')
         .then((res) => {
            return res.data;
         })
         .catch((err) => {
            console.error('Could not get providers from server');
         });
   }
   return providers;
}

export interface Genre {
   id: number;
   name: string;
}

/**
 * genresList is a cached version of all
 * of the possible genres for both movies
 * and tv shows
 */
interface GenreList {
   tv : Genre[];
   movie: Genre[];
}
let genresList: GenreList;
export const getGenres = async (type: 'movie' | 'tv'): Promise<Genre[]> => {

   /**
    * If genres haven't yet been gotten,
    * then grab them from the server, and
    * then cache them
    */
   if (!genresList) {
      genresList = await axios.get(config.server.apiUrl + 'info/genres')
      .then((res) => {
         return res.data;
      })
      .catch(() => {
         console.error('Could not get genres from server');
      });
   }  
   return genresList[type];
}