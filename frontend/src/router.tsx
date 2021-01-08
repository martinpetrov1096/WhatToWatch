import {BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import {ExpandedInfoRoute} from './routes/expanded-info-route';
import { GameStatusRoute } from './routes/game-status-route';
import { LobbyRoute } from './routes/lobby-route';
import { NewGameRoute } from './routes/new-game-route';
import { VoteRoute } from './routes/vote-route';


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