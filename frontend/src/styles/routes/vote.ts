import styled from 'styled-components';
import * as Global from '../global';


export const Wrapper = styled(Global.PurpleBG)`
   // Account for 60px nav and 20px padding
   height: calc(100vh - 80px); 
   width: calc(100% - 20px); 
   display: flex;
   flex-flow: column nowrap;
   justify-content: space-around;
   align-items: center;
`;

export const CardWrapper = styled.div`
   flex-basis: 400px;
   flex-shrink: 2;
   display: flex;
   justify-content: center;
   align-items: center;
   width: min(500px, 100%);

`;

export const VoteWrapper = styled.div`
   flex-basis: 100px;
   flex-shrink: 1;
   width: min(500px, 100%);
   display: flex;
   flex-flow: row nowrap;
   justify-content: space-around;

`;

const Button = styled.button`

   width: 100%;
   height: 100%;
   box-shadow: none;
   border: none;
   border-radius: 100%;
   outline: none;
   background-repeat: no-repeat;
   background-position: center;
   background-color: transparent;
`;

export const YesButton = styled(Button)`
   background-image: url("https://cdn.glitch.com/f885813f-4542-461e-9e2c-c21e4f424ee4%2FrejectButton.e604d513.svg?v=1591586148426");
`;

export const NoButton = styled(Button)`
   background-image: url("https://cdn.glitch.com/f885813f-4542-461e-9e2c-c21e4f424ee4%2FheartButton.1f05d0b6.svg?v=1591586129623");
`;

