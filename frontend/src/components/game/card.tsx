import { Link, useHistory, useParams } from 'react-router-dom'
import { ISwipe } from '../../types/swipe';
import config from '../../config/config.json';
import * as Card from '../../styles/components/card';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import useMeasure from "use-measure";
export interface ICardProp {
   card: ISwipe | undefined;
}
interface GameCardParamTypes {
   gameId: string;
}

export const GameCard = (props: ICardProp) => {
   const { gameId } = useParams<GameCardParamTypes>();
   const cardRef = useRef(null);
   const history = useHistory();


   const goToDetails = useCallback(() => {
      if (props.card) {
         history.push('/game/' + gameId + '/details/' + props.card.id);
      }
   }, [props.card]);

   if (props.card === undefined) {
      return <h1>Empty</h1>
   } else {
      return (
         <Card.Main posterUrl={(config.movieDb.posterUrl + props.card.poster_path).toString()} key={props.card.id} onClick={goToDetails}/>
      );
   }

}