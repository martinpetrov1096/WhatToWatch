import React, { useCallback, useEffect, useState } from 'react';
import { Switch,Route, useParams, useHistory } from 'react-router-dom';
import { io, Socket } from "socket.io-client";
import { useToasts } from 'react-toast-notifications';
import { GameNavbar } from '../../components/navbar';
import { GameVote } from './vote';
import { GameOverview } from './overview';
import { CardDetails } from './details';
import { InvalidGame } from "../invalid";
import config from '../../config/config.json';
import { ISwipe } from "../../types/swipe";
import { IGame } from "../../types/game";
import axios from "axios";


////////////////////////////////////////////////////
//////////////////// COMPONENT /////////////////////
////////////////////////////////////////////////////

export const GameRoute = () => {

   /* Get the game ID, and if invalid, redirect */
   const { gameId } = useParams<IGameParamTypes>();
   const [numPlayers, setNumPlayers] = useState<number>(0);
   const [swipes, setSwipes] = useState<Array<ISwipe>>([]);
   const [curSwipeIdx, setCurSwipeIdx] = useState<number>(0);
   const history = useHistory();
   const { addToast } = useToasts();
   const [socket, setSocket] = useState<Socket | null>(null);
   ////////////////////////////////////////////////////
   /////////////// USE EFFECT FUNCTIONS ///////////////
   ////////////////////////////////////////////////////

   /**
    * Create the socketio connection when the
    * game starts and set it each time the 
    * gameId changes
    */
   useEffect(():(() => void) => {
    const newSocket = io(config.server.gameSocketUrl, {
        query: {
           'gameId': gameId
        },
        forceNew: true
     });
    setSocket(newSocket);
    return () => {
       newSocket.close();
    }
 }, [setSocket, gameId]);


   /**
    * Monitor lobbyId. If it is changed, 
    * verify that it is a proper lobbyId.
    * If it isn't, redirect to the error
    * page
    */
   useEffect(() => {
      axios.get(config.server.apiUrl + 'game', {
         params: {
            id: gameId
         }
      }).then((res) => {
         if (res.data.status !== 'game') {
            history.replace('/error');
         }
      })
      .catch(() => {
        history.replace('/error');
      })
   }, [gameId, history, socket]);

   /**
    * When the component gets mounted, 
    * initiate the socketio client and 
    * define all of the socket.on 
    * event functions
    */
   useEffect(() => {
      socket?.on('newSwipes', (swipes: Array<ISwipe>) => {
         setSwipes((oldSwipes) => {
            return oldSwipes.concat(...swipes);
         });
      });

      /**
       * If there aren't any more swipes, 
       * just disconnect
       */
      socket?.on('noNewSwipes', () => {
         /**
          * Setting curSwipeIdx to -99
          * indicates that there are no
          * more cards left
          */
         setCurSwipeIdx((oldIdx) => {
            if (oldIdx === -1) {
               return -99;
            }
            return oldIdx;
         });
      });

      socket?.on('newConn', (numPlayers: number) => {
         addToast('A new player joined', {appearance: 'info'});
         setNumPlayers(numPlayers);
      });

      socket?.on('newDisconn', (numPlayers: number) => {
         addToast('A player left', {appearance: 'info'});
         setNumPlayers(numPlayers);
      });

      socket?.on('connection', (game: IGame) => {
         setNumPlayers(game.numPlayers);

         /**
          * Setting curSwipeIdx to -99
          * indicates that there are no
          * more cards left
          */
         if (game.swipes.length === 0) {
            setCurSwipeIdx(-99);
         }
         setSwipes(game.swipes);
      });

      socket?.on('voted', ({swipeId, vote}: {swipeId: number, vote: 'yes' | 'no'}) => {
         setSwipes((oldSwipes) => {
            const idx = oldSwipes.findIndex((swipe) => swipe.id === swipeId);
            if (idx === -1) {
               return oldSwipes;
            }
            const newSwipes = JSON.parse(JSON.stringify(oldSwipes));
            vote === 'yes' ? ++newSwipes[idx].numLikes : ++newSwipes[idx].numDislikes;
            return newSwipes;
         });
      });

      socket?.on('error', (err: Error) => {
         console.log(err);
      });
   }, [gameId, addToast, socket]);
   
   /**
    * Monitor @swipes to watch when new
    * cards get added. If they get added,
    * and if @curSwipeIdx == -1, it means that
    * we were waiting for more cards, so we 
    * need to update the current card
    */
   useEffect(() => {
      if (curSwipeIdx === -1) {
         setCurSwipeIdx(swipes.findIndex((swipe) => swipe.vote === undefined));
      }
   }, [swipes, curSwipeIdx]);
   ////////////////////////////////////////////////////
   ///////////// ONCLICK HANDLER FUNCTIONS ////////////
   ////////////////////////////////////////////////////
   
   /**
    * A function that can be passed as a
    * param to the vote card to vote 
    * yes or no
    * @param vote the vote
    */
   const voteFunc = useCallback((vote: 'yes' | 'no') => {
      
      if (vote === 'yes') {
         socket?.emit('vote', { gameId: gameId, swipeId: swipes[curSwipeIdx].id, vote: 'yes' });
         swipes[curSwipeIdx].vote = 'yes';
      } else {
         socket?.emit('vote', { gameId: gameId, swipeId: swipes[curSwipeIdx].id, vote: 'no' });
         swipes[curSwipeIdx].vote = 'no';
      }

      /**
       * After voting, set the curSwipeIdx to the next
       * one. If curSwipeIdx === -1, request for more 
       * swipes. When they are receieved a useEffect 
       * call will update curSwipeIdx. 
       */
      const nextSwipe = swipes.findIndex((swipe) => swipe.vote === undefined);
      if (nextSwipe === -1) {
         socket?.emit('genNewSwipes');
      }
      setCurSwipeIdx(nextSwipe);
   }, [swipes, gameId, curSwipeIdx, socket]);

   return (
         <Switch>
            <Route path="/game/:gameId/:subpath(vote|overview)" >
               <GameNavbar route="vote"/>     
               <Route exact path="/game/:gameId/vote">
                  <GameVote vote={voteFunc} curSwipe={swipes[curSwipeIdx]} swipeIdx={curSwipeIdx}/>
               </Route>
               <Route exact path="/game/:gameId/overview/">
                  <GameOverview swipes={swipes.filter((x) => x.vote !== undefined)} />
               </Route>
            </Route>
            <Route exact path="/game/:gameId/details/:cardId">
               <CardDetails cards={swipes}/>
            </Route>
            <Route path="/game">
               <InvalidGame apology="Sorry, this page doesn't exist :("/>
            </Route>
         </Switch>
   );
}
////////////////////////////////////////////////////
/////////////// COMPONENT PROP TYPES ///////////////
////////////////////////////////////////////////////
interface IGameParamTypes {
   gameId: string;
};