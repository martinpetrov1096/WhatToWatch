import axios, { AxiosResponse } from "axios";
import { IGame, IResult, ISwipe } from "../models/game";
import config from '../config/config.json';
export class ApiService {
   private static instance: ApiService;

   public static getInstance(): ApiService {
      if (!ApiService.instance) {
         ApiService.instance = new ApiService();
      }
      return ApiService.instance;
   }

   public async getSwipes(game: IGame): Promise<Array<ISwipe>> {
      const results = await this.getResults(game);
      return results.map((res: IResult): ISwipe => {
         const swipe= res as ISwipe;
         swipe.numDislikes = 0;
         swipe.numLikes = 0;
         return swipe;
      });
   }

   private async getResults(game: IGame): Promise<Array<IResult>> {
      const params = {
         'api_key': config.movieDbApi.apiKey,
         'with_genres': game.genres.toString(),
         'vote_average.gte': game.minRating,
         'page': game.page,
         ...config.movieDbApi.defaults

      }
      return axios.get(config.movieDbApi.discover + game.type, {
         params: params,
      }).then((res: AxiosResponse) => {
         if (res.status != 200) {
            throw new Error('Moviedb API Error');
         }
         return res.data.results as Array<IResult>;
      });
   }
}