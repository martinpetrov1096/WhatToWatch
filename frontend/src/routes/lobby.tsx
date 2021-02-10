import { useParams, useHistory } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client";
import axios from 'axios';
import config from '../config/config.json';
import { ILobby } from '../types/lobby';
import { LobbyGenres } from '../components/lobby/genres'
import { LobbyMinRating } from '../components/lobby/min-rating';
import { LobbyID } from '../components/lobby/id';
import { LobbyType } from '../components/lobby/type';
import { LobbyProviders } from '../components/lobby/providers';
import { ButtonAccent } from '../styles/styled-components/global';
import { useToasts } from 'react-toast-notifications';
import styled from 'styled-components';

interface ILobbyParamTypes {
   lobbyId: string;
}

let socket: Socket;
export const LobbyRoute = () => {
   
   const { lobbyId } = useParams<ILobbyParamTypes>();
   const history = useHistory();
   const { addToast } = useToasts();
   const [lobby, setLobby] = useState<ILobby>({
      id: lobbyId,
      playing: false,
      numPlayers: 1,
      type: 'movie',
      genres: [],
      providers: [],
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
      socket =io(config.server.lobbySocketUrl, {
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
      socket.on('newConn', (numPlayers: number) => {
         addToast('A new player joined', {appearance: 'info'});
      });
      socket.on('newDisconn', (numPlayers: number) => {
         addToast('A player left', {appearance: 'info'});
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
   }, [lobbyId, addToast]);

   /**
    * Monitor lobbyId. If it is changed, 
    * verify that it is a proper lobbyId.
    * If it isn't, redirect to the error
    * page
    */
   useEffect(() => {
      axios.get(config.server.apiUrl + 'game', {
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
   }, [lobbyId, history]);

   /**
    * Monitor lobby.playing. If it is
    * set to true, disconnect the socket,
    * and go to the game route, and emit
    * start
    */
   useEffect(() => {
      if (lobby.playing) {
         socket.disconnect();
         /**
          * Add a small delay just to make sure
          * we can enter the game
          */
         setTimeout(() => {
            history.push('/game/' + lobbyId + '/vote');
         }, 250);

      }
   }, [lobby, history, lobbyId]);

   const startGame = useCallback(() => {
      socket.emit('start');
   }, []);

   return (
      <BG>
         <Title>What-To-Watch</Title>
         <Heading>
            While you're waiting for everyone to join, 
            help us help you to find what to watch by narrowing 
            down the choices
         </Heading>
         <LobbyID lobbyId={lobbyId}/>
         <LobbyType type={lobby.type} socket={socket}/>
         <LobbyMinRating curMinRating={lobby.minRating} socket={socket}/>
         <LobbyGenres type={lobby.type} socket={socket} selectedGenres={lobby.genres}/>
         <LobbyProviders selectedProviders={lobby.providers} socket={socket}/>
         <ButtonAccent onClick={startGame}>START</ButtonAccent>
      </BG>
   );
}
///////////////////////////////////////////////////////////////////////////
////////////////////////////////// STYLES /////////////////////////////////
///////////////////////////////////////////////////////////////////////////

/**
 * Make the BG height auto, and not 100%
 * since later on when we keep adding 
 * options, things might get cluttered
 */
const BG = styled.div`
   margin: 0;
   padding: 10px;
   height: auto;
   display: flex;
   flex-flow: column nowrap;
   justify-content: flex-start;
   align-items: center;
`;

const Title = styled.h1`
   margin: 20px 0;
   font-size: max(5vw, 30px);
`;

const Heading = styled.h4`
   max-width: 800px;
   font-size: 14px;
   text-align: center;
`;

