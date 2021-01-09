import { Link } from 'react-router-dom';
import { config } from '../../config';
import { ICardModel } from '../../types/card';

import { GameCard } from './card';
interface IVoteProp {
   vote: (v: 'yes' | 'no') => void;
   curSwipe: ICardModel;
}

export const GameVote = (props: IVoteProp) => {
   return (
      <div>
         <h1>GameVote</h1>
         <GameCard card={props.curSwipe}/>
         <div>
            <button onClick={()=>props.vote('yes')}>Yes</button>
            <button onClick={()=>props.vote('no')}>No</button>
         </div>
      </div>
   );
}