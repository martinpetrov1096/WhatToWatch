import { GameService } from '../../services/gameService';
import { IGame, IResult, ISwipe } from '../../models/game';

const gameService = GameService.getInstance();

export const gameSocket = (socket: any) => {

   let gameId = socket.handshake.query.gameId;
   console.log(gameId);

   /* On connection, send client the game */
   gameService.connect(gameId)
      .then((game: IGame) => {
         socket.join(gameId);
         socket.emit('connection', game);
         socket.to(gameId).emit('newConn', game.numPlayers);
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
      /* Generate more results, and then
      send them to everyone */
      console.log('generating new swipes');
      gameService.genSwipes(gameId)
         .then((newSwipes: Array<ISwipe>) => {
            socket.emit('newSwipes', newSwipes);
            socket.to(gameId).emit('newSwipes', newSwipes);
         })
         .catch((err: any) => {
            console.log(err.message);
            socket.emit('error', err.message);
         });
   });

   socket.on('vote', ({gameId, swipeId, vote}: any) => {
      if (vote != 'yes' && vote != 'no') {
         throw new Error('Vote must Either be yes or no');
      }
      gameService.vote(gameId, swipeId, vote)
         .then((game: Array<ISwipe>) => {
            socket.emit('voted', {'swipeId':swipeId, 'vote': vote});
            socket.to(gameId).emit('voted', {'swipeId':swipeId, 'vote': vote});
         })
         .catch((err: any) => {
            console.log(err.message);
            socket.emit('error', err);
         });
   });

   
}