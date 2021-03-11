import { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import config from '../config/config.json';
import ReactCodeInput from 'react-code-input';
import styled from 'styled-components';
import { ButtonAccent } from '../styles/styled-components/global';
import { useToasts } from 'react-toast-notifications';


export const HomeRoute = function() {

   const [joinCode, _setJoinCode] = useState<string>('');
   const history = useHistory();
   const { addToast } = useToasts();
   /**
    * These two functions are just used to
    * wrap the setJoinCode so that we can
    * check that it's the proper length
    */
   const setJoinCode = (code: string) => {
      if (code.length <= 5) {
         _setJoinCode(code.toUpperCase());
      }
   }

   const newGame = useCallback(() => {
      axios.post(config.server.apiUrl + 'game')
         .then((res) => {
            if (res.status === 200) {
              // setJoinCode(res.data.id);
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
            console.log(err.message);
            addToast(err.message, {appearance: 'error'});
         });
   },[history, addToast]);

   /**
    * Check if join code is valid each time it
    * changes its value. 
    */
   useEffect(() => {
      if (joinCode.length === 5) {
         axios.get(config.server.apiUrl + 'game', {
            params: {
               id: joinCode
            }
         }).then((res) => {
            if (res.status === 200) {
               console.log(res.data.status);
               if (res.data.status === 'game') {
                  history.push('/game/' + joinCode + '/vote');
               } else if (res.data.status === 'lobby') {
                  history.push('/lobby/' + joinCode);
               }

               addToast('Valid Code', {appearance: 'success'});
            }
         }).catch(() => {
            addToast('Invalid Code', {appearance: 'error'});
         });
      }
   }, [joinCode, addToast, history]);

   return (
      <Wrapper>
         <Header>
            <Title>What-To-Watch</Title>
            <Description>A quick and easy way to coordinate with friends to decided on what to watch</Description>
         </Header>
         <ButtonAccent onClick={newGame}>NEW GAME</ButtonAccent>
         <OrHeader>Or Enter Join Code</OrHeader>
         <JoinInput onChange={setJoinCode} value={joinCode ?? '     '}/>
      </Wrapper>
   );
}
///////////////////////////////////////////////////////////////////////////
////////////////////////////////// STYLES /////////////////////////////////
///////////////////////////////////////////////////////////////////////////

const Wrapper = styled.div`
   margin: 0;
   padding: 10px;
   display: flex;
   flex-flow: column;
   align-items: center;
   justify-content: flex-start;
   width: calc(100% - 20px);
   height: calc(100% - 20px);
`;

const Header = styled.div`
   flex: 0 1 40%;
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

const JoinInput = styled(ReactCodeInput).attrs({
   type: 'text',
   fields: 5,
   name: 'joinCode',
   inputMode: 'full-width-latin',
   autocorrect: 'off',
   autocapitalize: 'none'

})`
   display: flex;
   justify-content: space-between;
   
   > input {
      margin: 5px;
      box-shadow: ${(props: any) => props.theme.boxShadowInset};
      outline: none;
      appearance: none;
      border: none;
      border-radius: 5px;
      width: 45px;
      height: 45px;
      background-color: ${(props: any) => props.theme.colorPrimary};
      text-align: center;
      font-size: 16px;
      color: white;
   }

`;

const OrHeader = styled.h2`
   font-size: 30px;
   margin: 10px;
`;