import React, { createContext, Dispatch, SetStateAction, useEffect, useReducer, useState } from "react";
import { Switch,Route } from "react-router-dom";
import openSocket from "socket.io-client";
import { GameNavbar } from '../components/game/navbar';
import { GameVote } from '../components/game/vote';
import { GameOverview } from '../components/game/overview';
import { IGameModel } from "../types/game";
import { tempState } from "../temp-store";
import { ICardModel } from "../types/card";
import { config } from '../config';
import { CardDetails } from '../components/game/details';

let socket = {
   emit: (v:'yes' | 'no') => {
      console.log('emitting');
   }
};


export const GameRoute = () => {

   const [vote, setVote] = useState('no');
   const [nextSwipes, setNextSwipes] = useState(tempState.nextSwipes);
   const [prevSwipes, setPrevSwipes] = useState(tempState.prevSwipes);

   useEffect(() => {
   //   socket = openSocket(config.server.socket);
   }, []);


   const voteFunc = (vote: 'yes' | 'no') => {
      socket.emit(vote);
      setVote(vote);
   }


   return (
      <div>
         <GameNavbar/>
         <h1>{vote}</h1>
         <Switch>
            <Route exact path="/game/vote">
               <GameVote vote={voteFunc} curSwipe={nextSwipes[0]}/>
            </Route>
            <Route exact path="/game/overview/">
               <GameOverview swipes={prevSwipes} />
            </Route>
            <Route path="/game/details/">
               <CardDetails card={nextSwipes[0]}/>
            </Route>
         </Switch>
      </div>
   );
}