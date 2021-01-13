export default async(socket: any, next: (err?: any) => void): Promise<void> => {

   if (!socket.handshake.query.gameId) {
      next(new Error('Socket miissing gameId param'));
   }
}