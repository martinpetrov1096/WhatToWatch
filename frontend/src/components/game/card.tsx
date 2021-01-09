
import { Link } from 'react-router-dom'
import { ICardModel } from '../../types/card';
import { config } from '../../config';
interface ICardProp {
   card: ICardModel;
}

export const GameCard = (props: ICardProp) => {
   return (
      <div>
         <Link to={'/game/details/' + props.card.id}> 
            <h1>{props.card.original_title}</h1>
            <img 
               src={config.movieDb.posterUrl + props.card.poster_path}
               alt=""
            />
         
         </Link>

      </div>
   );
}