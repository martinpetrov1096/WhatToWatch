import { useCallback } from "react";
import { Socket } from "socket.io-client";
import styled from 'styled-components';
import { Wrapper, Title, Description } from '../../styles/styled-components/lobby';
import { Button } from '../../styles/styled-components/global';

////////////////////////////////////////////////////
//////////////////// COMPONENT /////////////////////
////////////////////////////////////////////////////
export const LobbyMinRating = (props: IMinRatingParamTypes) => {

   const changeMinRating = useCallback((MinRating: number) => {
      props.socket?.emit('changeMinRating', MinRating);
   }, [props.socket]);

   const handleChange = useCallback((event: any) => {
      changeMinRating(parseInt(event.target.value));
   }, [changeMinRating]);

   return (
      <Wrapper>
         <Title>Minimum Rating</Title>
         <Description>
            Filter results so that all movie/tv-show 
            recommendations are above a certain minimum
            rating
         </Description>
         <SelectionWrapper>
            <RatingButton onClick={() => changeMinRating(props.curMinRating-1)}>-</RatingButton>
            <Input type="number" value={props.curMinRating} onChange={handleChange} min="0" max="9"/>
            <RatingButton onClick={() => changeMinRating(props.curMinRating+1)}>+</RatingButton>
         </SelectionWrapper>
      </Wrapper>
   );
}
////////////////////////////////////////////////////
/////////////// COMPONENT PROP TYPES ///////////////
////////////////////////////////////////////////////
interface IMinRatingParamTypes {
   curMinRating: number;
   socket: Socket | null;
}
////////////////////////////////////////////////////
//////////////// STYLED COMPONENTS /////////////////
////////////////////////////////////////////////////

const SelectionWrapper = styled.div`
   display: flex;
   flex-flow: row nowrap;
   align-items: center;
`;
const RatingButton = styled(Button)`
   width: 50px;
   height: 50px;
   text-align: center;
`;
const Input = styled.input`
   margin: 10px;
   border: none;
   border-radius: 10px;
   outline: none;
   width: 80px;
   height: 80px;
   background-color: ${(props: any) => props.theme.colorPrimary};
   box-shadow: ${(props: any) => props.theme.boxShadowInset};
   text-align: center;
   color: white;
   font-family: 'Varela', sans-serif;
   font-size: 32px;
   ::-webkit-outer-spin-button,
   ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
   }
   -moz-appearance: textfield; // Firefox
`;