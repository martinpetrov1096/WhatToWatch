
import { Link, useParams } from 'react-router-dom'
import { ISwipe } from '../../types/swipe';
import { config } from '../../config';
import { useEffect, useState } from 'react';
interface ICardProp {
   card: ISwipe | undefined;
}

interface GameCardParamTypes {
   gameId: string;
}

export const GameCard = (props: ICardProp) => {
   const { gameId } = useParams<GameCardParamTypes>();
   
   const [test, setTest] = useState(props.card?.numLikes);

   useEffect(()=> {
      
      setTest(props.card?.numLikes);
   }, [props.card?.numLikes]);

   if (props.card == undefined) {
      return <h1>Empty</h1>
   } else {
      return (
         <div key={props.card.id}>
            <Link to={'/game/' + gameId + '/details/' + props.card.id}> 
               <h1>{props.card.original_title}</h1>
               <img 
                  src={config.movieDb.posterUrl + props.card.poster_path}
                  alt=""
               />
               <h1>Num Likes: {test}</h1>
            </Link>
   
         </div>
      );
   }

}