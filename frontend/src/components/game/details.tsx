import { ISwipeModel } from '../../types/swipe';
import { useParams, useHistory } from 'react-router-dom';

import { ICardModel } from '../../types/card';
import { config } from '../../config';

interface ICardProp {
   card: ICardModel;
}

export const CardDetails = (props: ICardProp) => {
   const id = useParams();
   const history = useHistory();
   console.log(id);
   return (
      <div style={{background: 'url(' + config.movieDb.bgUrl + props.card.backdrop_path + ')', height: '400px'}}>
         <button onClick={()=> history.goBack()}>Go Back</button>
         <h1>Details</h1>
      </div>
   );
}