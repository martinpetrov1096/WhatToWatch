import { useCallback } from "react";
import * as MinRating from '../../styles/components/lobby/min-rating';

interface IMinRatingParamTypes {
   curMinRating: number;
   changeMinRating: (minRating: number) => void;
}

export const LobbyMinRating = (props: IMinRatingParamTypes) => {

   const handleChange = useCallback((event: any) => {
      props.changeMinRating(parseInt(event.target.value));
   }, [props]);

   return (
      <MinRating.Wrapper>
         <MinRating.Header>Minimum Rating</MinRating.Header>
         <MinRating.SelectionWrapper>
            <MinRating.Button onClick={() => props.changeMinRating(props.curMinRating-1)}>-</MinRating.Button>
            <MinRating.Input type="number" value={props.curMinRating} onChange={handleChange} min="0" max="9"/>
            <MinRating.Button onClick={() => props.changeMinRating(props.curMinRating+1)}>+</MinRating.Button>
         </MinRating.SelectionWrapper>
      </MinRating.Wrapper>

   );
}