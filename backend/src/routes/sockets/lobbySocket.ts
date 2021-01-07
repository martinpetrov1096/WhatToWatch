import { LobbyService } from '../../services/lobbyService';
import { Lobby } from '../../models/lobbyModel';

///////////////////////////////////////////////////////////////////////////
///////////////////////////////// CONFIG //////////////////////////////////
///////////////////////////////////////////////////////////////////////////


const lobbyService = LobbyService.getInstance();
///////////////////////////////////////////////////////////////////////////
////////////////////////////// SOCKET ROUTES //////////////////////////////
///////////////////////////////////////////////////////////////////////////

export const lobbySocket = (socket: any) => {

   let lobbyId = socket.handshake.query.gameId;
   console.log(lobbyId);

   /* On connection, connect */
   lobbyService.connect(lobbyId)
      .then((lobby: Lobby) => {
         socket.join(lobbyId);
         socket.emit('update', lobby);
         socket.to(lobbyId).emit('update', lobby);
      })
      .catch(err => {
         console.log(err.message);
         socket.emit('error', err);
      });

   socket.on('disconnect', () => {
      lobbyService.disconnect(lobbyId)
         .then((lobby: Lobby) => {
            socket.to(lobbyId).emit('update', lobby);
         }) 
         .catch((err: any) => {
            console.log(err.message);
            socket.emit('error', err);
         });
   });

   socket.on('addGenre', (genre: any) => {
      if (typeof genre != 'number') {
         socket.emit('error', new Error('Genre must be a number'))
      } else {
         lobbyService.addGenre(lobbyId, genre)
            .then((lobby: Lobby) => {
               socket.to(lobbyId).emit('update', lobby);
            })
            .catch((err: any) => {
               console.log(err.message);
               socket.emit('error', err);
            });
      }
   });

   socket.on('delGenre', (genre: any) => {
      if (typeof genre != 'number') {
         socket.emit('error', new Error('Genre must be a number'))
      } else {
         lobbyService.delGenre(lobbyId, genre)
            .then((lobby: Lobby) => {
               socket.to(lobbyId).emit('update', lobby);
            })
            .catch((err: any) => {
               console.log(err.message);
               socket.emit('error', err);
            });
      }
   });

   socket.on('changeType', (type: any) => {
      if (typeof type != 'string' && (type != 'movie' && type != 'tv')) {
         socket.emit('error', new Error('type must be a string that is either \'tv-show\' or \'movie\''))
      } else {
         lobbyService.changeType(lobbyId, type)
            .then((lobby: Lobby) => {
               socket.to(lobbyId).emit('update', lobby);
            })
            .catch((err: any) => {
               console.log(err.message);
               socket.emit('error', err);
            });
      }
   });

   socket.on('start', () => {
      lobbyService.start(lobbyId)
         .then((lobby: Lobby) => {
            socket.emit('update', lobby);
            socket.to(lobbyId).emit('update', lobby);
         })
         .catch((err: any) => {
            console.log(err.message);
            socket.emit('error', err);
         });
   });
};