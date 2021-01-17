import { useParams, useHistory } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";
import axios from 'axios';
import Switch from 'react-switch';
import config from '../config/config.json';
import { ILobby } from '../types/lobby';
import { GenreSelector } from '../components/lobby/genreSelector'
import { MinRating } from '../components/lobby/minRating';
import * as Lobby from '../styles/routes/lobby';
import { color, Button } from '../styles/global';

interface ILobbyParamTypes {
   lobbyId: string;
}

let socket: Socket;
export const LobbyRoute = function() {
   
   const { lobbyId } = useParams<ILobbyParamTypes>();
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
         console.log('updating');
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
   useEffect(() => { //TODO: Add back later
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
   }, [lobby, history, lobbyId]);
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

   const TypeSwitchParams = {
      checkedIcon: false,
      uncheckedIcon: false,
      offColor: color.primaryDark,
      onColor: color.primaryDark,
      offHandleColor: color.secondary,
      onHandleColor: color.secondary,
      height: 22,
      handleDiameter: 26
   }

   return (
      <Lobby.BG>
         <Lobby.Title>What-To-Watch</Lobby.Title>
         <Lobby.IDWrapper>
            <Lobby.ID>{lobbyId[0]}</Lobby.ID>
            <Lobby.ID>{lobbyId[1]}</Lobby.ID>
            <Lobby.ID>{lobbyId[2]}</Lobby.ID>
            <Lobby.ID>{lobbyId[3]}</Lobby.ID>
            <Lobby.ID>{lobbyId[4]}</Lobby.ID>

         </Lobby.IDWrapper>
         <Lobby.TypeWrapper>
            <Lobby.Type>MOVIE</Lobby.Type>
            <Switch checked={lobby.type=='tv'} onChange={(checked) => checked ? setType('tv') : setType('movie')} {...TypeSwitchParams}/>
            <Lobby.Type>TV SHOW</Lobby.Type>
         </Lobby.TypeWrapper>
         <GenreSelector type={lobby.type} addGenre={addGenre} delGenre={delGenre} curGenres={lobby.genres} />
         <MinRating curMinRating={lobby.minRating} changeMinRating={changeMinRating} />

         <Button onClick={startGame}>Start Game</Button>
      </Lobby.BG>
   );
}