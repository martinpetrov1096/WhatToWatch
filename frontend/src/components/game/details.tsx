import { ISwipeModel } from '../../types/swipe';
import { useParams, useHistory } from 'react-router-dom';

import { ICardModel } from '../../types/card';
import { config } from '../../config';

interface ICardProp {
   cards: Array<ICardModel>;
}
interface ParamTypes {
   cardId: string
 }
export const CardDetails = (props: ICardProp) => {
   const  { cardId } = useParams<ParamTypes>();
   const history = useHistory();

   return (
      <div style={{background: 'url(' + config.movieDb.bgUrl + (props.cards.find((card) => card.id === parseInt(cardId)) || props.cards[0]).backdrop_path + ')', height: '400px'}}>
         <button onClick={()=> history.goBack()}>Go Back</button>
         <h1>Details</h1>
      </div>
   );
}