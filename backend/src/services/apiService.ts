import axios, { AxiosResponse } from "axios";
import { IGame, IResult, ISwipe } from "../types/game";
import config from '../config/config.json';
export class ApiService {
   private static instance: ApiService;

   public static getInstance(): ApiService {
      if (!ApiService.instance) {
         ApiService.instance = new ApiService();
      }
      return ApiService.instance;
   }
   ///////////////////////////////////////////////////////////////////////////
   ////////////////////////////// CORE METHODS ///////////////////////////////
   ///////////////////////////////////////////////////////////////////////////

   public async getSwipes(game: IGame): Promise<Array<ISwipe>> {
      /**
       * Check if the game had more than 1
       * genre selected. Then, grab the
       * appropriate results
       */
      let results;
      if (game.genres.length > 1) {
         results = await this.getUnionResults(game);
      } else {
         results = await this.getResults(game);
      }

      return results.map((res: IResult): ISwipe => {
         const swipe= res as ISwipe;
         swipe.numDislikes = 0;
         swipe.numLikes = 0;
         return swipe;
      });
   }

   public async getDetails(id: number, type: 'movie' | 'tv') {
      return axios.get(config.movieDbApi.details.url + type + '/' + id, {
         params: {
            'api_key': process.env.API_KEY,
            ...config.movieDbApi.details.defaults
         }
      }).then((res: AxiosResponse) => {
         if (res.status != 200) {

            throw new Error('Moviedb API Error');
         }

         return res.data;
      })
   }
   ///////////////////////////////////////////////////////////////////////////
   ///////////////////////// PRIVATE HELPER METHODS //////////////////////////
   ///////////////////////////////////////////////////////////////////////////

   private async getResults(game: IGame): Promise<Array<IResult>> {
      return axios.get(config.movieDbApi.discover.url + game.type, {
         params: {
            'api_key': process.env.API_KEY,
            'with_genres': game.genres.toString(),
            'vote_average.gte': game.minRating,
            'page': game.page,
            ...config.movieDbApi.discover.defaults
         }
      }).then((res: AxiosResponse) => {
         if (res.status != 200) {
            throw new Error('Moviedb API Error');
         }
         return res.data.results as Array<IResult>;
      });
   }

   private async getUnionResults(game: IGame): Promise<Array<IResult>> {

      /**
       * For each genre specified, make a request to 
       * the movieDbApi, and then combine all of the
       * requests into a 1D array
       */
      const results = game.genres.map((genre: number) => {
         return axios.get(config.movieDbApi.discover.url + game.type, {
            params: {
               'api_key': process.env.API_KEY,
               'with_genres': genre.toString(),
               'vote_average.gte': game.minRating,
               'page': game.page,
               ...config.movieDbApi.discover.defaults
            }
         }).then((res: AxiosResponse) => {
            if (res.status != 200) {
               throw new Error('Moviedb API Error');
            }
            return res.data.results as Array<IResult>;
         });
      }).reduce(async (prev, current) => [...await prev, ...await current])

      /**
       * Remove any duplicates after getting the
       * results.
       */
      const uniqueResults = (await results).filter((elem, pos, array) => {
         return array.findIndex(e => e.id == elem.id) === pos;
      });

      /**
       * Shuffle the values so that we don't end
       * up having all of the types of one genre
       * right after eachother
       */
      for (let i = uniqueResults.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * i)
         const temp = uniqueResults[i];
         uniqueResults[i] = uniqueResults[j];
         uniqueResults[j] = temp;
      }
      return uniqueResults;
   }
}