import React, { useCallback, useEffect, useRef, useState } from "react";
import { Switch,Route, useParams, Redirect, useHistory } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { GameNavbar } from '../components/game/navbar';
import { GameVote } from '../components/game/vote';
import { GameOverview } from '../components/game/overview';
import { CardDetails } from '../components/game/details';
import { InvalidGame } from "./invalid";
import { config } from "../config/config";
import { ISwipe } from "../types/swipe";
import { IGame } from "../types/game";
import axios from "axios";


interface GameParamTypes {
   gameId: string;
}
let socket: Socket;
export const GameRoute = () => {

   /* Get the game ID, and if invalid, redirect */
   const { gameId } = useParams<GameParamTypes>();
   const [numPlayers, setNumPlayers] = useState<number>(0);
   const [prevSwipes, setPrevSwipes] = useState<Array<ISwipe>>([]);
   const [nextSwipes, setNextSwipes] = useState<Array<ISwipe>>([]);
   const history = useHistory();
   ///////////////////////////////////////////////////////////////////////////
   /////////////////////////// USE EFFECT FUNCTIONS //////////////////////////
   ///////////////////////////////////////////////////////////////////////////

      /**
    * Monitor lobbyId. If it is changed, 
    * verify that it is a proper lobbyId.
    * If it isn't, redirect to the error
    * page
    */
   useEffect(() => {
      axios.get('http://' + config.server.url + '/game', {
         params: {
            id: gameId
         }
      }).then((res) => {
         if (res.data.Status !== 'Game') {
            history.push('/error');
            socket.disconnect();
         }
      })
      .catch(() => {
         history.push('/error');
         socket.disconnect();
      })
   }, [gameId]);

   /**
    * When the component gets mounted, 
    * initiate the socketio client and 
    * define all of the socket.on 
    * event functions
    */
   useEffect(() => {
      /* Init socket io client */
      socket = io(config.server.url + '/game', {
         query: {
            'gameId': gameId
         }
      });

      socket.on('newSwipes', (swipes: Array<ISwipe>) => {
         console.log(swipes.length);
         setNextSwipes((oldNextSwipes) => {
            return oldNextSwipes.concat(...swipes);
         });
      });

      /**
       * If there aren't any more swipes, 
       * just disconnect
       */
      socket.on('noNewSwipes', () => {
         console.log('no new swipes left, disconnecting');
         socket.disconnect();
      });

      socket.on('newConn', (numPlayers: number) => {
         console.log('new player joined');
         setNumPlayers(numPlayers);
      });

      socket.on('newDisconn', (numPlayers: number) => {
         console.log('player left');
         setNumPlayers(numPlayers);
      });

      socket.on('connection', (game: IGame) => {
         console.log('connected');
         setNumPlayers(game.numPlayers);
         setNextSwipes(game.swipes);
      });

      socket.on('voted', ({swipeId, vote}: {swipeId: number, vote: 'yes' | 'no'}) => {
         /**
          * Need to setPrevSwipes and grab the 
          * current value from the callback. This way,
          * we can actually get the recent value of
          * prevSwipes
          */
         setPrevSwipes((curVal) => {
            const inPrevSwipes = curVal?.findIndex((swipe) => swipe.id === swipeId);
            if (inPrevSwipes !== -1) {
               const newPrevSwipes = JSON.parse(JSON.stringify(curVal));
               if (vote === 'yes') {
                  ++newPrevSwipes[inPrevSwipes].numLikes;
               } else if ( vote === 'no') {
                  ++newPrevSwipes[inPrevSwipes].numDislikes;
               }
               return newPrevSwipes;
            }
            return curVal;
         });
         /**
          * Need to setNextSwipes and grab the 
          * current value from the callback. This way,
          * we can actually get the recent value of
          * nextSwipes
          */
         setNextSwipes((curVal) => {
            const inNextSwipes = curVal?.findIndex((swipe) => swipe.id === swipeId);
            if (inNextSwipes !== -1) {
               const newNextSwipes = JSON.parse(JSON.stringify(curVal));
               console.log('inNext swipes');
               if (vote === 'yes') {
                  ++newNextSwipes[inNextSwipes].numLikes;
               } else if ( vote === 'no') {
                  ++newNextSwipes[inNextSwipes].numDislikes;
               }
              return newNextSwipes;
            }
            return curVal;
         });
      });
      socket.on('error', (err: Error) => {
         console.log(err);
      });
      
      /**
       * Return a function that disconnects from 
       * the socket so we can cleanup
       */
      return () => {
         console.log('game cleanup');
         socket.disconnect();
      }
   }, []);

   /**
    * Monitor @nextSwipes so we can make 
    * sure that we don't run out of cards
    * If we do, request more swipes via
    * the socket client. To prevent this
    * from occurring before the server
    * can send all of the existing swipes,
    * we check that prevSwipes.length !== 0
    */
   useEffect(() => {
      if (nextSwipes.length === 0 && prevSwipes.length !== 0) {
         socket.emit('genNewSwipes');
         console.log('getting more swipes');
      }

   }, [nextSwipes, prevSwipes]);

   useEffect(() => {
   }, [prevSwipes])


   ///////////////////////////////////////////////////////////////////////////
   ///////////////////////// ONCLICK HANDLER FUNCTIONS ///////////////////////
   ///////////////////////////////////////////////////////////////////////////
   /**
    * A function that can be passed as a
    * param to the vote card to vote 
    * yes or no
    * @param vote the vote
    */
   const voteFunc = useCallback((vote: 'yes' | 'no') => {
      if (nextSwipes[0] === undefined) {
         return;
      }
      if (nextSwipes[0].id === undefined) {
         return;
      }
      if (vote === 'yes') {
         //++curVote.numLikes;
         socket.emit('vote', { gameId: gameId, swipeId: nextSwipes[0].id, vote: 'yes' });
      } else {
        // ++curVote.numDislikes;
         socket.emit('vote',  { gameId: gameId, swipeId: nextSwipes[0].id, vote: 'no'});
      }
      setPrevSwipes([
         nextSwipes[0],
         ...prevSwipes
      ]);
      setNextSwipes(nextSwipes.slice(1,));
   }, [nextSwipes, prevSwipes, gameId]);

   return (
      <div>
         <GameNavbar/>
         <Switch>
            <Route exact path="/game/:gameId/vote">
               <GameVote vote={voteFunc} curSwipe={nextSwipes[0]}/>
            </Route>
            <Route exact path="/game/:gameId/overview/">
               <GameOverview swipes={prevSwipes} />
            </Route>
            <Route exact path="/game/:gameId/details/:cardId">
               <CardDetails cards={nextSwipes}/>
            </Route>
            <Route path="/game">
               <InvalidGame/>
            </Route>
         </Switch>
      </div>
   );
}