import { useCallback } from "react";
import { Socket } from "socket.io-client";
import * as MinRating from '../../styles/components/lobby/min-rating';

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
      <MinRating.Wrapper>
         <MinRating.Header>Minimum Rating</MinRating.Header>
         <MinRating.SelectionWrapper>
            <MinRating.Button onClick={() => changeMinRating(props.curMinRating-1)}>-</MinRating.Button>
            <MinRating.Input type="number" value={props.curMinRating} onChange={handleChange} min="0" max="9"/>
            <MinRating.Button onClick={() => changeMinRating(props.curMinRating+1)}>+</MinRating.Button>
         </MinRating.SelectionWrapper>
      </MinRating.Wrapper>
   );
}