import { useCallback } from "react";
import { Socket } from "socket.io-client";
import styled from 'styled-components';
import * as Global from '../../styles/global';
interface IMinRatingParamTypes {
   curMinRating: number;
   socket: Socket;
}

export const LobbyMinRating = (props: IMinRatingParamTypes) => {

   const changeMinRating = useCallback((MinRating: number) => {
      props.socket.emit('changeMinRating', MinRating);
      console.log('changing minimum rating');
   }, [props.socket]);

   const handleChange = useCallback((event: any) => {
      changeMinRating(parseInt(event.target.value));
   }, [changeMinRating]);

   return (
      <Wrapper>
         <Header>Minimum Rating</Header>
         <SelectionWrapper>
            <Button onClick={() => changeMinRating(props.curMinRating-1)}>-</Button>
            <Input type="number" value={props.curMinRating} onChange={handleChange} min="0" max="9"/>
            <Button onClick={() => changeMinRating(props.curMinRating+1)}>+</Button>
         </SelectionWrapper>
      </Wrapper>
   );
}
///////////////////////////////////////////////////////////////////////////
////////////////////////////////// STYLES /////////////////////////////////
///////////////////////////////////////////////////////////////////////////

const Wrapper = styled.div`
   margin-bottom: 30px;
   display: flex;
   flex-flow: column nowrap;
   align-items: center;
`;

const Header = styled.h3`
   font-size: 30px;
`;

const SelectionWrapper = styled.div`
   display: flex;
   flex-flow: row nowrap;
   align-items: center;
`;

const Button = styled(Global.Button)`
   width: 40px;
   height: 40px;
   padding: 0;
   text-align: center;
`;

const Input = styled.input`
   border: none;
   border-radius: 8px;
   box-shadow: inset 2px 2px 2px #191B30;
   outline: none;
   width: 40px;
   height: 40px;
   background-color: ${Global.color.primaryDark};
   text-align: center;
   color: white;
   font-family: 'Varela', sans-serif;
   
   ::-webkit-outer-spin-button,
   ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
   }
   -moz-appearance: textfield // Firefox
`;