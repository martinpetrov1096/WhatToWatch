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

      const results = await this.getResults(game);

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
            /**
             * The pipe seperator tells the movieDb api to
             * do union results
             */
            'with_genres': game.genres.join('|'),
            'with_watch_providers': game.providers.join('|'),
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
}