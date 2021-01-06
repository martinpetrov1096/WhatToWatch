import { Socket } from "socket.io";

export interface GameSocket extends Socket {
   gameId: string;
}