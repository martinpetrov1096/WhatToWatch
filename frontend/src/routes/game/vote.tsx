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
   const [curVote, setCurVote] = useState<'yes' | 'no' | undefined>(undefined);

   const vote = useCallback((v: 'yes' | 'no') => {
      /**
       * If the current swipe is undefined,
       * then don't do anything
       */
      if (props.curSwipe === undefined) {
         return;
      }

      /**
       * Set vote, then after 500ms,
       * get the next card, and then
       * after another 500ms, setVote
       * to be undefined
       */
      setCurVote(v);
      setTimeout(() => {
         props.vote(v);
      }, 363);
      setTimeout(() => {
         setCurVote(undefined);
      }, 750);
   }, [props]);


   useEffect(() => {
      switch(props.swipeIdx) {
         // case -1:
         //    setCurView(
         //       <h1>Loading . . . </h1>
         //    );
         //    break;
         case -99:
            setCurView(
               <Vote.Wrapper>
                  <h1>No Swipes Left</h1>
               </Vote.Wrapper>
            );
            break;
         default:
            setCurView(
               <Vote.Wrapper>
                  <Vote.CardWrapper vote={curVote}>
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
   }, [props, curVote, vote]);

   return curView;
}