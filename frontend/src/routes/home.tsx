import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config/config.json';
import ReactCodeInput from 'react-code-input';
import * as Global from '../styles/global';
import { Title, Description, HomeBG, GameSection, Header, JoinSection, NewButton, JoinButton, OrHeader} from '../styles/routes/home';


export const HomeRoute = function() {

   const [joinCode, _setJoinCode] = useState<string>('');
   const [validCode, setValidCode] = useState<boolean>(false)

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
   const newGame = useRef(() => {
      axios.post('http://' + config.server.url + '/game')
         .then((res) => {
            if (res.status === 200) {
               setJoinCode(res.data.id);
            }
         })
         .catch((err)=> {
            console.log(err);
         });
   });

   /**
    * Check if join code is valid each time it
    * changes its value. 
    */
   useEffect(() => {
      if (joinCode.length === 5) {
         axios.get('http://' + config.server.url + '/game', {
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
      <HomeBG>
         <Header>
            <Title>What-To-Watch</Title>
            <Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Description>
         </Header>
         <GameSection>
            <NewButton onClick={newGame.current}>NEW</NewButton>
            <OrHeader>OR</OrHeader>
            <JoinSection>
               <ReactCodeInput type="text" fields={5} name="joinCode" inputMode="full-width-latin" onChange={setJoinCode} value={joinCode || '     '}/>
               <Link to={'/lobby/' + joinCode}>
                  <JoinButton disabled={!validCode}>JOIN</JoinButton>
               </Link>
            </JoinSection>
         </GameSection>
      </HomeBG>
   );
}