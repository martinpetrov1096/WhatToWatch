import { GameService } from '../../services/gameService';
import { IGame, ISwipe } from '../../types/game';

const gameService = GameService.getInstance();

export const gameSocket = (socket: any) => {

   let gameId = socket.handshake.query.gameId;
   console.log('Connected to game: ' + gameId);

   /* On connection, send client the game */
   gameService.connect(gameId)
      .then((game: IGame) => {
         socket.join(gameId);
         socket.emit('connection', game);
         socket.to(gameId).emit('newConn', game.numPlayers);

         /**
          * Check if new swipes have a length
          * of 0. If they do, no more swipes left
          * so disconnect
          */
         if (game.swipes.length == 0) {
            socket.emit('noNewSwipes');
            socket.to(gameId).emit('noNewSwipes');
         }
      })
      .catch((err: any) => {
         console.log(err.message);
         socket.emit('error', err.message);
      });

   socket.on('disconnect', () => {
      console.log('disconnected');
      gameService.disconnect(gameId)
         .then((game: IGame) => {
            socket.to(gameId).emit('newDisconn', game.numPlayers);
         }) 
         .catch((err: any) => {
            console.log(err.message);
            socket.emit('error', err);
         });
   });

   socket.on('genNewSwipes', () => {
      /**
       * Generate more results, and then
       * send them to everyone
       */
      gameService.genSwipes(gameId)
         .then((newSwipes: Array<ISwipe>) => {
            
            /**
             * Check if new swipes have a length
             * of 0. If they do, no more swipes left
             * so disconnect
             */
            if (newSwipes.length == 0) {
               socket.emit('noNewSwipes');
               socket.to(gameId).emit('noNewSwipes');
            }
            socket.emit('newSwipes', newSwipes);
            socket.to(gameId).emit('newSwipes', newSwipes);
         })
         .catch((err: any) => {
            console.log(err.message);
            socket.emit('error', err.message);
         });
   });

   socket.on('vote', ({gameId, swipeId, vote, revote}: any) => {
      if (vote != 'yes' && vote != 'no') {
         throw new Error('Vote must Either be yes or no');
      }
      gameService.vote(gameId, swipeId, vote, revote)
         .then((game: Array<ISwipe>) => {
            socket.emit('voted', {'swipeId':swipeId, 'vote': vote, revote: revote});
            socket.to(gameId).emit('voted', {'swipeId':swipeId, 'vote': vote, revote: revote});
         })
         .catch((err: any) => {
            console.log(err.message);
            socket.emit('error', err);
         });
   });
}