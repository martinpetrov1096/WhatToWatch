import { useHistory, useParams } from 'react-router-dom'
import { ISwipe } from '../../types/swipe';
import config from '../../config/config.json';
import * as Card from '../../styles/components/game/card';
import { Loading } from '../loading';

import { useCallback, useRef } from 'react';
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
   }, [props.card, gameId, history]);

   if (props.card === undefined) {
      return <Loading/>
   } else {
      return (
         <Card.Main posterUrl={(config.movieDb.posterUrl + props.card.poster_path).toString()} key={props.card.id} onClick={goToDetails}/>
      );
   }

}