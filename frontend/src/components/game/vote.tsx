import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { config } from '../../config';
import { ISwipe } from '../../types/swipe';

import { GameCard } from './card';
interface IVoteProp {
   vote: (v: 'yes' | 'no') => void;
   curSwipe: ISwipe | undefined;
}

export const GameVote = (props: IVoteProp) => {


   return (
      <div>
         <h1>GameVote</h1>
         <GameCard card={props.curSwipe}/>
         <div>
            <button onClick={()=>props.vote('yes')}>Yes</button>
            <button onClick={()=>props.vote('no')}>No</button>
            <h1>Num Likes: {props.curSwipe?.numLikes}</h1>
         </div>
      </div>
   );


}