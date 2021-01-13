import { useEffect } from 'react';
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
         </div>
      </div>
   );
}