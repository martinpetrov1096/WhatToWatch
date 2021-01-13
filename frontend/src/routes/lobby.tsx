import { useParams, useHistory } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";
import axios from 'axios';
import { config } from '../config/config';
import { ILobby } from '../types/lobby';
import { GenreSelector } from '../components/lobby/genreSelector'
import { MinRating } from '../components/lobby/minRating';

interface LobbyParamTypes {
   lobbyId: string;
}


let socket: Socket;
export const LobbyRoute = function() {
   
   const { lobbyId } = useParams<LobbyParamTypes>();
   const history = useHistory();
   const [lobby, setLobby] = useState<ILobby>({
      id: lobbyId,
      playing: false,
      numPlayers: 1,
      type: 'movie',
      genres: [],
      minRating: 1
   });

   ///////////////////////////////////////////////////////////////////////////
   /////////////////////////// USE EFFECT FUNCTIONS //////////////////////////
   ///////////////////////////////////////////////////////////////////////////

   /**
    * When the component gets mounted, 
    * initiate the socketio client and 
    * define all of the socket.on 
    * event functions
    */
   useEffect(() => {
      socket =io(config.server.url + '/lobby', {
         query: {
            'gameId': lobbyId
         }
      });

      socket.on('update', (lobby: ILobby) => {
         console.log('new value');
         setLobby((oldLobby: ILobby) => {
            return JSON.parse(JSON.stringify(lobby));
         });
      });
      socket.on('error', (err: string) => {
         console.log(err);
         switch(err) {
            case 'game has already started':
               socket.disconnect();
         }
      });
      return () => {
         console.log('lobby cleanup');
         socket.disconnect();
      }
   }, []);

   /**
    * Monitor lobbyId. If it is changed, 
    * verify that it is a proper lobbyId.
    * If it isn't, redirect to the error
    * page
    */
   useEffect(() => {
      axios.get('http://' + config.server.url + '/game', {
         params: {
            id: lobbyId
         }
      }).then((res) => {
         if (res.data.Status !== 'Lobby') {
            history.push('/error');
            socket.disconnect();
         }
      })
      .catch(() => {
         history.push('/error');
         socket.disconnect();
      })
   }, [lobbyId]);

   /**
    * Monitor lobby.playing. If it is
    * set to true, disconnect the socket,
    * and go to the game route, and emit
    * start
    */
   useEffect(() => {
      if (lobby.playing) {
         socket.disconnect();
         history.push('/game/' + lobbyId + '/vote');
      }
   }, [lobby]);


   ///////////////////////////////////////////////////////////////////////////
   ///////////////////////// ONCLICK HANDLER FUNCTIONS ///////////////////////
   ///////////////////////////////////////////////////////////////////////////


   const startGame = useCallback(() => {
      socket.emit('start');
   }, []);

   const setType = useCallback((newType: 'movie' | 'tv') => {
      socket.emit('changeType', newType);
   }, []);

   const addGenre = useCallback((genreId: number) => {
      socket.emit('addGenre', genreId);
      console.log('adding genre');
   }, []);

   const delGenre = useCallback((genreId: number) => {
      socket.emit('delGenre', genreId);
      console.log('deleting genre');
   }, []);

   const changeMinRating = useCallback((MinRating: number) => {
      socket.emit('changeMinRating', MinRating);
      console.log('changing minimum rating');
   }, []);

   // /**
   //  * The following handle the rating
   //  */
   // const setMinRating = useRef((rating: number) => {

   //    if (rating > 0 && rating < 10) {
   //       lobby.minRating = rating;
   //       setLobby({
   //          ...lobby,
   //          minRating: rating
   //       });
   // //      socket.emit('change', 'tv-show');
   //       }
   // });

   // const handleRatingChange = useRef((event: any) => {
   //    const newRating = parseInt(event.target.value);
   //    setMinRating.current(newRating);
   // });


   return (
      <div>
         
         <h1>Lobby</h1>
         <h2>LobbyId: {lobbyId}</h2>
         <GenreSelector type={lobby.type} addGenre={addGenre} delGenre={delGenre} curGenres={lobby.genres}/>
         <MinRating curMinRating={lobby.minRating} changeMinRating={changeMinRating} />


         <form>
            <input type="radio" id="tvBtn" name="type" value="tv" checked={lobby.type === 'tv'} onChange={()=>setType('tv')}/>
            <label htmlFor="tv">TV-Show</label>
            <input type="radio" id="movieBtn" name="type" value="movie" checked={lobby.type === 'movie'} onChange={()=>setType('movie')}/>
            <label htmlFor="movie">Movie</label>
         </form>

         <button onClick={startGame}>Start Game</button>
         <button onClick={()=>lobby.genres.includes(2) ? addGenre(2) : delGenre(2)}>Add genre</button>
      </div>
   )
}