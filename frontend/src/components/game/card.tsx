
import { Link, useParams } from 'react-router-dom'
import { ICardModel } from '../../types/card';
import { config } from '../../config';
interface ICardProp {
   card: ICardModel;
}

interface GameCardParamTypes {
   gameId: string;
}

export const GameCard = (props: ICardProp) => {
   const { gameId } = useParams<GameCardParamTypes>();
   console.log(gameId);
   return (
      <div>
         <Link to={'/game/' + gameId + '/details/' + props.card.id}> 
            <h1>{props.card.original_title}</h1>
            <img 
               src={config.movieDb.posterUrl + props.card.poster_path}
               alt=""
            />
         
         </Link>

      </div>
   );
}