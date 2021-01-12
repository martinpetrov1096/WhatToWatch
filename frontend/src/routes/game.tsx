import React, { useEffect, useRef, useState } from "react";
import { Switch,Route, useParams, Redirect } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { GameNavbar } from '../components/game/navbar';
import { GameVote } from '../components/game/vote';
import { GameOverview } from '../components/game/overview';
import { CardDetails } from '../components/game/details';
import { InvalidGame } from "./invalid";
import { config } from "../config";
import { ISwipe } from "../types/swipe";


interface GameParamTypes {
   gameId: string;
}
let socket: Socket;
export const GameRoute = () => {

   /* Get the game ID, and if invalid, redirect */
   const { gameId } = useParams<GameParamTypes>();
   const [prevSwipes, setPrevSwipes] = useState<Array<ISwipe>>([]);
   const [nextSwipes, setNextSwipes] = useState<Array<ISwipe>>([]);
   
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
      console.log('initing')
      socket = io(config.server.url + '/game', {
         query: {
            'gameId': gameId
         }
      });

      socket.on('newSwipes', (swipes: Array<ISwipe>) => {
         setNextSwipes(nextSwipes.concat(...swipes));
        
      });
      socket.on('connection', () => {
         console.log('connected');
      });
      
      socket.on('voted', ({swipeId, vote}:any) => {

         if (vote !== 'yes' && vote !== 'no') {
            return;
         }
         console.log(vote + swipeId);

         setPrevSwipes((curVal) => {
            console.log(curVal)

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
         setNextSwipes((curVal) => {
            console.log(curVal)
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
      
      return () => {
         console.log('game cleanup');
         socket.disconnect();
      }
   }, []);

   useEffect(() => {
      if (nextSwipes.length === 0) {
         socket.emit('genNewSwipes');
         console.log('getting more swipes');
      }

   }, [nextSwipes]);





   const voteFunc = (vote: 'yes' | 'no') => {
      if (nextSwipes[0] === undefined) {
         return;
      }
      if (nextSwipes[0].id === undefined) {
         return;
      }
      const curVote = nextSwipes[0];
      if (vote === 'yes') {
         ++curVote.numLikes;
         socket.emit('vote', { gameId: gameId, swipeId: nextSwipes[0].id, vote: 'yes' });
      } else {
         ++curVote.numDislikes;
         socket.emit('vote',  { gameId: gameId, swipeId: nextSwipes[0].id, vote: 'no'});
      }
      setPrevSwipes([
         nextSwipes[0],
         ...prevSwipes
      ]);
      setNextSwipes(nextSwipes.slice(1,));
   }


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
         <button onClick={()=>socket.emit('genNewSwipes')}>new swipes</button>
      </div>
   );
}