import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { LobbyRoute } from './lobby';
import { GameRoute } from './game/game';
import { HomeRoute } from './home';
import { InvalidGame } from './invalid';

export const Router = function() {

   return (
      <BrowserRouter>
         <Switch>
            <Route exact path="/lobby/:lobbyId">
               <LobbyRoute/>
            </Route>
            <Route path="/game/:gameId">
               <GameRoute/>
            </Route>
            <Route exact path="/">
               <HomeRoute/>
            </Route>
            <Route path="/">
               <InvalidGame/>
            </Route>
         </Switch>
      </BrowserRouter>
   );
}