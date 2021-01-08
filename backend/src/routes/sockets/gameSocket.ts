import { GameService } from '../../services/gameService';
import { Game, Result } from '../../models/gameModel';

const gameService = GameService.getInstance();

export const gameSocket = (socket: any) => {

   let gameId = socket.handshake.query.gameId;
   console.log(gameId);

   /* On connection, send client the game */
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

   socket.on('genSwipes', () => {
      /* Generate more results, and then
      send them to everyone */
      gameService.genSwipes(gameId)
         .then((results: Array<Result>) => {
            socket.emit('swipes', results);
            socket.to(gameId).emit('swipes', results);
         })
         .catch((err: any) => {
            console.log(err.message);
            socket.emit('error', err);
         });
   });


}