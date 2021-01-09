import { ICardModel } from './card';

export enum Vote {
   'undecided',
   'disliked',
   'liked'
}

export interface ISwipeModel {
   card: ICardModel;
   vote: Vote;
}