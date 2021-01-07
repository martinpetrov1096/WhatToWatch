import { GameService } from '../../services/gameService';
import { Game } from '../../models/gameModel';

const gameService = GameService.getInstance();

export const gameSocket = (socket: any) => {

   let gameId = socket.handshake.query.gameId;
   console.log(gameId);

   /* On connection, connect */
   gameService.connect(gameId)
      .then((game: Game) => {
         socket.join(gameId);
         socket.emit('update', game);
         socket.to(gameId).emit('update', game);
      })
      .catch((err: any) => {
         console.log(err.message);
         socket.emit('error', err);
      });

      socket.on('disconnect', () => {
         console.log('disconnected');
         gameService.disconnect(gameId)
            .then((game: Game) => {
               socket.to(gameId).emit('update', game);
            }) 
            .catch((err: any) => {
               console.log(err.message);
               socket.emit('error', err);
            });
      });

}