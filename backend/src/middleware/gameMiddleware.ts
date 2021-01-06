import { Socket } from "socket.io";
import { GameSocket } from '../types/gameSocketType';

export default async(socket: GameSocket, next: any) => {
   if (!socket.gameId) {
      next(new Error('Socket miissing gameId param'));
   }
}