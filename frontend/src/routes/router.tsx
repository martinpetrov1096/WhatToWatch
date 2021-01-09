import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { LobbyRoute } from './lobby';
import { GameRoute } from './game';
import { HomeRoute } from './home';

export const Router = function() {



   
   return (
      <BrowserRouter>
         <Switch>
            <Route path="/game">
               <GameRoute/>
            </Route>
            <Route path="/lobby">
               <LobbyRoute/>
            </Route>
            <Route path="/">
               <HomeRoute/>
            </Route>
         </Switch>
      </BrowserRouter>


   )

}