import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config/config.json';
import ReactCodeInput from 'react-code-input';
import * as Global from '../styles/global';
import * as Home from '../styles/routes/home';
import { useHistory } from 'react-router-dom';

export const HomeRoute = function() {

   const [joinCode, _setJoinCode] = useState<string>('');
   const [validCode, setValidCode] = useState<boolean>(false)
   const history = useHistory();
   /**
    * These two functions are just used to
    * wrap the setJoinCode so that we can
    * check that it's the proper length
    */
   const setJoinCode = (code: string) => {
      if (code.length <= 5) {
         _setJoinCode(code);
      }
   }

   /**
    * newGame should use useRef vs useState
    * since it isn't ever being updated to the 
    * dom
    */
   const newGame = useCallback(() => {
      axios.post(config.server.url + config.server.newGame)
         .then((res) => {
            if (res.status === 200) {
               setJoinCode(res.data.id);

               /**
                * Add a small delay just to make sure
                * we can enter the game
                */
               setTimeout(() => {
                  history.push('/lobby/' + res.data.id);
               }, 250);
            }
         })
         .catch((err)=> {
            console.log(err);
         });
   },[history]);

   /**
    * Check if join code is valid each time it
    * changes its value. 
    */
   useEffect(() => {
      if (joinCode.length === 5) {
         axios.get(config.server.url + 'game/', {
            params: {
               id: joinCode
            }
         }).then((res) => {
            if (res.status === 200) {
               setValidCode(true);
            } else {
               setValidCode(false);
            }
         }).catch(() => {
            setValidCode(false);
         });
      }

   }, [joinCode]);

   return (
      <Home.BG>
         <Home.Header>
            <Home.Title>What-To-Watch</Home.Title>
            <Home.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Home.Description>
         </Home.Header>
         <Home.GameSection>
            <Home.NewButton onClick={newGame}>NEW GAME</Home.NewButton>
            <Home.OrHeader>OR</Home.OrHeader>
            <Home.JoinSection>
               <ReactCodeInput type="text" fields={5} name="joinCode" inputMode="full-width-latin" onChange={setJoinCode} value={joinCode || '     '}/>
               <Link to={'/lobby/' + joinCode}>
                  <Home.JoinButton disabled={!validCode}>JOIN</Home.JoinButton>
               </Link>
            </Home.JoinSection>
         </Home.GameSection>
      </Home.BG>
   );
}