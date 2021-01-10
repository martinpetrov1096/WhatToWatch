import { Link, useParams, useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from "socket.io-client";
import axios from 'axios';
import { config } from '../config';
interface LobbyParamTypes {
   lobbyId: string;
}

interface Lobby {
   id: string;
   playing: boolean;
   type: 'movie' | 'tv';
   numPlayers: number;
   genre: Array<number>;
   minRating: number;
}

let socket: Socket;
export const LobbyRoute = function() {
   
   const { lobbyId } = useParams<LobbyParamTypes>();
   const history = useHistory();
   const [lobby, setLobby] = useState<Lobby>({
      id: lobbyId,
      playing: false,
      numPlayers: 1,
      type: 'movie',
      genre: [],
      minRating: 1
   });
   let updateFlag = useRef<boolean>(true);

   /* Init socket io client and add all functions */
   useEffect(() => {
      socket =io(config.server.url + '/lobby', {
         query: {
            'gameId': lobbyId
         }
      });
      socket.on('connection', () => {
         console.log('connected');
      });

      socket.on('update', (lobby: Lobby) => {
         console.log('new value');
         setLobby(lobby);
      });
      socket.on('conn', (newLobby: Lobby) => {
         console.log('new conn')
         setLobby({
            ...lobby,
            type: newLobby.type,
            genre: newLobby.genre,
            numPlayers: newLobby.numPlayers,
            minRating: newLobby.minRating
         });
      })

      /**
       * Need mySocket so we can reference
       * it when the cleanup is happening
       */
      return () => {
         console.log('cleanup')
         socket.disconnect();
      }
   }, []);
   /**
    * Check that lobbyId is valid each time it
    * changes its value. If it isn't redirect 
    * to the invalid page
    */
   useEffect(() => {
      axios.get('http://' + config.server.url + '/game', {
         params: {
            id: lobbyId
         }
      }).then((res) => {
         if (res.status !== 200) {
            history.push('/error');
            socket.disconnect();
         }
      })
      .catch(() => {
         history.push('/error');
         socket.disconnect();
      })
   }, [lobbyId]);



   const setType = useRef((newType: 'movie' | 'tv') => {
      setLobby({
         ...lobby,
         type: newType
      });
      socket.emit('changeType', newType);
   })


   /**
    * The following handle the rating
    */
   const setMinRating = useRef((rating: number) => {

      if (rating > 0 && rating < 10) {
         lobby.minRating = rating;
         setLobby({
            ...lobby,
            minRating: rating
         });
   //      socket.emit('change', 'tv-show');
      }
   });

   const handleRatingChange = useRef((event: any) => {
      const newRating = parseInt(event.target.value);
      setMinRating.current(newRating);
   });

   const start = useRef(() => {
      socket.emit('start');
      console.log('yo')
   });


   return (
      <div>
         
         <h1>Lobby</h1>
         <h2>LobbyId: {lobbyId}</h2>

         <button onClick={() => setLobby({...lobby, minRating: lobby.minRating-1})}>-</button>
         <input type="text" value={lobby.minRating.toString()} onChange={handleRatingChange.current}/>
         <button onClick={() => setMinRating.current(lobby.minRating+1)}>+</button>

         <form>
            <input type="radio" id="tvBtn" name="type" value="tv" checked={lobby.type === 'tv'} onChange={()=>setType.current('tv')}/>
            <label htmlFor="tv">TV-Show</label>
            <input type="radio" id="movieBtn" name="type" value="movie" checked={lobby.type === 'movie'} onChange={()=>setType.current('movie')}/>
            <label htmlFor="movie">Movie</label>
         </form>

         <Link to={'/game/' + lobbyId + '/vote'}>
            <button onClick={()=>start.current()}>Start Game</button>
         </Link>
      </div>
   )
}