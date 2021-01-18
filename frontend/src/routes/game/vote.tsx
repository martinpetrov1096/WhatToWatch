import { useCallback, useEffect, useState } from 'react';
import { ISwipe } from '../../types/swipe';
import { GameCard } from '../../components/game/card';
import * as Vote from '../../styles/routes/vote';
interface IVoteProp {
   vote: (v: 'yes' | 'no') => void;
   curSwipe: ISwipe | undefined;
   swipeIdx: number;
}
export const GameVote = (props: IVoteProp) => {

   const [curView, setCurView] = useState(<h1>Loading . . . </h1>);
   const [justVoted, setJustVoted] = useState<boolean>(false);

   const vote = useCallback((v: 'yes' | 'no') => {

      setJustVoted(true);
      console.log(justVoted);
      setTimeout(() => {
         setJustVoted(false);
         props.vote(v);
      }, 1000);

   }, [props, justVoted]);


   useEffect(() => {
      switch(props.swipeIdx) {
         case -1:
            setCurView(
               <h1>Loading . . . </h1>
            );
            break;
         case -99:
            setCurView(
               <h1>No Swipes Left</h1>
            );
            break;
         default: 
            setCurView(
               <Vote.Wrapper>
                  <Vote.CardWrapper justVoted={justVoted}>
                     <GameCard card={props.curSwipe}/>
                  </Vote.CardWrapper>
                  <Vote.VoteWrapper>
                     <Vote.YesButton onClick={()=>vote('no')}/>
                     <Vote.NoButton onClick={()=>vote('yes')}/>
                  </Vote.VoteWrapper>

               </Vote.Wrapper>
            );
            break;
      }
   }, [props, justVoted, vote]);

   return curView;
}