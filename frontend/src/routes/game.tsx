import React, { createContext, Dispatch, SetStateAction, useEffect, useReducer, useState } from "react";
import { Switch,Route, useParams, Redirect } from "react-router-dom";
import { io } from "socket.io-client";
import { GameNavbar } from '../components/game/navbar';
import { GameVote } from '../components/game/vote';
import { GameOverview } from '../components/game/overview';
import { IGameModel } from "../types/game";
import { tempState } from "../temp-store";
import { ICardModel } from "../types/card";
import { config } from '../config';
import { CardDetails } from '../components/game/details';
import { InvalidGame } from "./invalid";

let socket = {
   emit: (v:'yes' | 'no') => {
      console.log('emitting');
   }
};

interface GameParamTypes {
   gameId: string;
}

export const GameRoute = () => {

   /* Get the game ID, and if invalid, redirect */
   const { gameId } = useParams<GameParamTypes>();


   const [vote, setVote] = useState('no');
   const [nextSwipes, setNextSwipes] = useState(tempState.nextSwipes);
   const [prevSwipes, setPrevSwipes] = useState(tempState.prevSwipes);


   
   useEffect(() => {
      socket = io(config.server.url + '/game');
   }, [gameId]);


   const voteFunc = (vote: 'yes' | 'no') => {
      socket.emit(vote);
      setVote(vote);
   }


   return (
      <div>
         <GameNavbar/>
         <h1>{vote}</h1>
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