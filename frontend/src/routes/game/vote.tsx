import { useCallback, useEffect, useState } from 'react';
import { ISwipe } from '../../types/swipe';
import { GameCard } from '../../components/game/card';
import * as Vote from '../../styles/routes/game/vote';
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
       * If the player already voted on
       * this card, don't do anything
       */
      if (props.curSwipe.vote) {
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
      if (props.swipeIdx === -99) {
         setCurView(
            <Vote.Wrapper>
               <h1>No Swipes Left</h1>
            </Vote.Wrapper>
         );
      }
      else {      
         setCurView(
            <Vote.Wrapper>
               <Vote.CardWrapper vote={curVote}>
                  <GameCard card={props.curSwipe}/>
               </Vote.CardWrapper>
               <Vote.VoteWrapper>
                  {/* Only allow to vote once per card by 
                        only having the button work when 
                        curVote != 'yes' or 'no' */}
                  <Vote.NoButton onClick={()=> curVote ? ()=>{} : vote('no')}/>
                  <Vote.YesButton onClick={()=> curVote ? ()=>{} : vote('yes')}/>
               </Vote.VoteWrapper>

            </Vote.Wrapper>
         );
      }
   }, [props, curVote, vote]);

   return curView;
}