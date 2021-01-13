import { ILobby } from "./lobby";
import { ISwipe } from "./swipe";


export interface IGame extends ILobby{
   page: number;
   swipes: Array<ISwipe>;
}