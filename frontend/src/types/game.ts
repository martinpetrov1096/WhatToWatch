import { ICardModel } from './card';
import { ISwipeModel } from './swipe';


export interface IGameModel {
   prevSwipes: Array<ISwipeModel>;
   nextSwipes: Array<ICardModel>;
};
