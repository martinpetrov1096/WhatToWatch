import { useCallback } from "react";
import * as Lobby from '../../styles/routes/lobby';

interface IMinRatingParamTypes {
   curMinRating: number;
   changeMinRating: (minRating: number) => void;
}

export const MinRating = (props: IMinRatingParamTypes) => {

   const handleChange = useCallback((event: any) => {
      props.changeMinRating(parseInt(event.target.value));
   }, [props]);

   return (
      <Lobby.MinRatingWrapper>
         <Lobby.MinRatingButton onClick={() => props.changeMinRating(props.curMinRating-1)}>-</Lobby.MinRatingButton>
         <Lobby.MinRatingInput type="number" value={props.curMinRating} onChange={handleChange} min="0" max="1"/>
         <Lobby.MinRatingButton onClick={() => props.changeMinRating(props.curMinRating+1)}>+</Lobby.MinRatingButton>
      </Lobby.MinRatingWrapper>
   );
}