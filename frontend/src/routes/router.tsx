import {BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import {ExpandedInfoRoute} from './expanded-info-route';
import { GameStatusRoute } from './game-status-route';
import { LobbyRoute } from './lobby-route';
import { NewGameRoute } from './new-game-route';
import { VoteRoute } from './vote-route';


export const Router = function() {

   return (
      <BrowserRouter>
         <div>
            <nav>
               <ul>
                  <li>
                  <Link to="/">Home</Link>
                  </li>
                  <li>
                  <Link to="/lobby">Lobby</Link>
                  </li>
                  <li>
                  <Link to="/vote">Vote</Link>
                  </li>
               </ul>
            </nav>
         </div>
         <Switch>
            
            <Route path="/more-info">
               <ExpandedInfoRoute/>
            </Route>
            <Route path="/status">
               <GameStatusRoute/>
            </Route>
            <Route path="/lobby">
               <LobbyRoute/>
            </Route>
            <Route path="/vote">
               <VoteRoute/>
            </Route>
            <Route path="/">
               <NewGameRoute/>
            </Route>
         </Switch>
      </BrowserRouter>


   )

}