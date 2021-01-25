import styled from 'styled-components';
import * as Global from '../global';
import ReactCodeInput from 'react-code-input';

export const BG = styled(Global.PurpleBG)`
   display: flex;
   flex-flow: column;
   align-items: center;
   justify-content: space-around;
   width: calc(100% - 20px);
   height: calc(100% - 20px);
`;

export const Header = styled.div`
   flex-basis: 1;
   flex-grow: 1;
   display: flex;
   flex-flow: column;
   align-items: center;
   justify-content: center;
   width: calc(80% - 20px);
`;

export const Title = styled.h1`
   font-size: max(10vw, 60px);
   text-align: center;
`;

export const Description = styled.h6`
   font-size: max(1.2vw, 12px);
   text-align: center;
`;

export const GameSection = styled.div`
   flex-basis: 2;
   flex-grow: 2;
   display: flex;
   flex-flow: column;
   align-items: center;
   justify-content: flex-start;
`;

export const JoinSection = styled.div`
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

export const JoinInput = styled(ReactCodeInput)`
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
      background-color: ${Global.color.primaryDark};
      text-align: center;
      font-size: 16px;
      color: white;
   }

`;


export const JoinButton = styled(Global.Button)`
   disabled: ${(props: any) => props.disabled};
`;

export const NewButton = styled(Global.Button)`
   background-color: ${Global.color.secondary};
   border-color: ${Global.color.secondary};
`;

export const OrHeader = styled.h2`
   font-size: 30px;
   margin: 10px;
`;