import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ToastProvider } from 'react-toast-notifications'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LobbyRoute } from './routes/lobby/index';
import { GameRoute } from './routes/game/index';
import { HomeRoute } from './routes/index';
import { InvalidGame } from './routes/invalid';
import theme from './config/theme.json';


export default function App() {
   return (
      <ToastProvider autoDismiss={true} autoDismissTimeout={2000}>
         <ThemeProvider theme={theme}>
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
                     <InvalidGame apology="Sorry, this game or page doesn't exist :("/>
                  </Route>
               </Switch>
            </BrowserRouter>
         </ThemeProvider>
      </ToastProvider>
   );
}