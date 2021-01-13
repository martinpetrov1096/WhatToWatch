import { LobbyService } from '../../services/lobbyService';
import { ILobby } from '../../models/lobby';

///////////////////////////////////////////////////////////////////////////
///////////////////////////////// CONFIG //////////////////////////////////
///////////////////////////////////////////////////////////////////////////

const lobbyService = LobbyService.getInstance();
///////////////////////////////////////////////////////////////////////////
////////////////////////////// SOCKET ROUTES //////////////////////////////
///////////////////////////////////////////////////////////////////////////

export const lobbySocket = (socket: any) => {

   let lobbyId = socket.handshake.query.gameId;
   console.log('Connected to lobby: ' + lobbyId);

   lobbyService.connect(lobbyId)
      .then((lobby: ILobby) => {
         socket.join(lobbyId);
         socket.emit('update', lobby);
         socket.to(lobbyId).emit('update', lobby);
      })
      .catch(err => {
         console.log(err.message);
         socket.emit('error', err.message);
      });

   socket.on('disconnect', () => {
      lobbyService.disconnect(lobbyId)
         .then((lobby: ILobby) => {
            socket.to(lobbyId).emit('update', lobby);
         }) 
         .catch((err: any) => {
            console.log(err.message);
            socket.emit('error', err.message);
         });
   });

   socket.on('addGenre', (genre: number) => {
      console.log('adding genre');
      if (typeof genre != 'number') {
         socket.emit('error', new Error('Genre must be a number'))
      } else {
         lobbyService.addGenre(lobbyId, genre)
            .then((lobby: ILobby) => {
               socket.emit('update', lobby);
               socket.to(lobbyId).emit('update', lobby);
            })
            .catch((err: any) => {
               console.log(err.message);
               socket.emit('error', err.message);
            });
      }
   });

   socket.on('delGenre', (genre: any) => {
      if (typeof genre != 'number') {
         socket.emit('error', new Error('Genre must be a number'))
      } else {
         lobbyService.delGenre(lobbyId, genre)
            .then((lobby: ILobby) => {
               socket.emit('update', lobby);
               socket.to(lobbyId).emit('update', lobby);
            })
            .catch((err: any) => {
               console.log(err.message);
               socket.emit('error', err.message);
            });
      }
   });

   socket.on('changeMinRating', (minRating: number) => {
      lobbyService.changeMinRating(lobbyId, minRating)
         .then((lobby: ILobby) => {
            socket.emit('update', lobby);
            socket.to(lobbyId).emit('update', lobby);
         })
         .catch((err: any) => {
            console.log(err.message);
            socket.emit('error', err.message);
         });
   });

   socket.on('changeType', (type: any) => {
      if (typeof type != 'string' && (type != 'movie' && type != 'tv')) {
         socket.emit('error', new Error('type must be a string that is either \'tv-show\' or \'movie\''))
      } else {
         lobbyService.changeType(lobbyId, type)
            .then((lobby: ILobby) => {
               socket.emit('update', lobby);
               socket.to(lobbyId).emit('update', lobby);
            })
            .catch((err: any) => {
               console.log(err.message);
               socket.emit('error', err.message);
            });
      }
   });

   socket.on('start', () => {
      lobbyService.start(lobbyId)
         .then((lobby: ILobby) => {
            socket.emit('update', lobby);
            socket.to(lobbyId).emit('update', lobby);
         })
         .catch((err: any) => {
            console.log(err.message);
            socket.emit('error', err.message);
         });
   });
};