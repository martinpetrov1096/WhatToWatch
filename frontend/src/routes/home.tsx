import { useEffect, useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import config from '../config/config.json';
import ReactCodeInput from 'react-code-input';
import styled from 'styled-components';
import { Button, ButtonAccent } from '../styles/styled-components/global';
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

   const newGame = useCallback(() => {
      axios.post(config.server.apiUrl + 'game')
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
         axios.get(config.server.apiUrl + "/game", {
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
      <BG>
         <Header>
            <Title>What-To-Watch</Title>
            <Description>A quick and easy way to coordinate with friends to decided on what to watch</Description>
         </Header>
         <GameSection>
            <ButtonAccent onClick={newGame}>NEW GAME</ButtonAccent>
            <OrHeader>OR</OrHeader>
            <JoinSection>
               <JoinInput type="text" fields={5} name="joinCode" inputMode="full-width-latin" onChange={setJoinCode} value={joinCode ?? '     '}/>
               {/* <ReactCodeInput type="text" fields={5} name="joinCode" inputMode="full-width-latin" inputStyle={{width: '40px'}} onChange={setJoinCode} value={joinCode ?? '     '} /> */}
               <Link to={'/lobby/' + joinCode}>
                  <Button disabled={!validCode}>JOIN</Button>
               </Link>
            </JoinSection>
         </GameSection>
      </BG>
   );
}
///////////////////////////////////////////////////////////////////////////
////////////////////////////////// STYLES /////////////////////////////////
///////////////////////////////////////////////////////////////////////////

const BG = styled.div`
   margin: 0;
   padding: 10px;
   display: flex;
   flex-flow: column;
   align-items: center;
   justify-content: space-around;
   width: calc(100% - 20px);
   height: calc(100% - 20px);
`;

const Header = styled.div`
   flex-basis: 1;
   flex-grow: 1;
   display: flex;
   flex-flow: column;
   align-items: center;
   justify-content: center;
   width: calc(80% - 20px);
`;

const Title = styled.h1`
   font-size: max(10vw, 60px);
   text-align: center;
`;

const Description = styled.h6`
   font-size: max(1.2vw, 12px);
   text-align: center;
`;

const GameSection = styled.div`
   flex-basis: 2;
   flex-grow: 2;
   display: flex;
   flex-flow: column;
   align-items: center;
   justify-content: flex-start;
`;

const JoinSection = styled.div`
   display: flex;
   flex-flow: row nowrap;
   align-items: center;
   justify-content: center;
   @media (max-width: 410px) {
      flex-flow: column;
      justify-content: space-around;
      align-items: space-around;
   }
`;

const JoinInput = styled(ReactCodeInput)`
   display: flex;
   justify-content: space-between;
   width: 100%;
   
   > input {
      margin: 5px;
      box-shadow: inset 2px 2px 2px #191B30;
      outline: none;
      appearance: none;
      border: none;
      border-radius: 5px;
      width: 35px;
      height: 35px;
      background-color: ${(props: any) => props.theme.colorPrimaryDark};
      text-align: center;
      font-size: 16px;
      color: white;
   }

`;




const OrHeader = styled.h2`
   font-size: 30px;
   margin: 10px;
`;