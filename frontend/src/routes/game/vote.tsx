import { useCallback, useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { ISwipe } from '../../types/swipe';
import { GameCard } from '../../components/card';
import Button from '../../components/svg-button';


////////////////////////////////////////////////////
//////////////////// COMPONENT /////////////////////
////////////////////////////////////////////////////

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
            <Wrapper>
               <h1>No Swipes Left</h1>
            </Wrapper>
         );
      }
      else {      
         setCurView(
            <Wrapper>
               <CardWrapper vote={curVote}>
                  <GameCard card={props.curSwipe}/>
               </CardWrapper>
               <VoteWrapper>
                  {/* Only allow to vote once per card by 
                        only having the button work when 
                        curVote != 'yes' or 'no' */}
                  <VoteButton viewBox="0 0 295.64 295.64" width="100" height="100" onClick={()=> curVote ? ()=>{} : vote('no')}>
                     <title>rejectButton</title>
                     <path className="fill" d="M174.56,147.52l44.05-44.05a13.85,13.85,0,0,0,
                     0-19.59l-9.79-9.79a13.86,13.86,0,0,0-19.58,0l-44.05,44.06L101.13,74.09a13.86,
                     13.86,0,0,0-19.58,0l-9.79,9.79a13.85,13.85,0,0,0,0,19.59l44.05,44.05-44,44a13.84,
                     13.84,0,0,0,0,19.58l9.79,9.8a13.86,13.86,0,0,0,19.58,0l44.06-44.06L189.24,221a13.86,
                     13.86,0,0,0,19.58,0l9.79-9.8a13.84,13.84,0,0,0,0-19.58Z"/>
                     <circle className="stroke" strokeWidth="10" strokeMiterlimit="10" cx="147.82" cy="147.82" r="142.82"/>
                  </VoteButton>
                  <VoteButton viewBox="0 0 295.64 295.64" width="100" height="100" onClick={()=> curVote ? ()=>{} : vote('yes')}>
                     <title>heartButton</title>
                     <path className="fill" d="M219.31,80.82c-19-16.18-47.23-13.27-64.66,
                     4.71l-6.83,7-6.82-7c-17.4-18-45.67-20.89-64.66-4.71-21.76,18.57-22.9,
                     51.9-3.43,72L140,222.09a10.86,10.86,0,0,0,15.69,0l67-69.23c19.51-20.14,
                     18.37-53.47-3.39-72Z"/>
                     <circle className="stroke" strokeWidth="10" strokeMiterlimit="10" cx="147.82" cy="147.82" r="142.82"/>
                  </VoteButton>
               </VoteWrapper>
            </Wrapper>
         );
      }
   }, [props, curVote, vote]);

   return curView;
}
////////////////////////////////////////////////////
/////////////// COMPONENT PROP TYPES ///////////////
////////////////////////////////////////////////////

interface IVoteProp {
   vote: (v: 'yes' | 'no') => void;
   curSwipe: ISwipe | undefined;
   swipeIdx: number;
}
////////////////////////////////////////////////////
//////////////// STYLED COMPONENTS /////////////////
////////////////////////////////////////////////////

const Wrapper = styled.div`
   position: relative;
   margin: 0;
   padding: 10px;
   // Account for 60px nav and 20px padding
   height: calc(100% - 80px); 
   width: calc(100% - 20px); 
   display: flex;
   flex-flow: column nowrap;
   justify-content: space-around;
   align-items: center;
`;
const voteYesKeyframe = () => keyframes`
50% {
   transform: translateX(400px) rotate(45deg) rotateY(90deg);
}
to {
   transform: translateX(0) rotateY(360deg);
}
`;
const voteNoKeyframe = () => keyframes`
   50% {
      transform: translateX(-400px) rotate(-45deg) rotateY(90deg);
   }
   to {
      transform: translateX(0) rotateY(360deg);
   }
`;

type CardWrapperStyleProp = {
   vote: 'yes' | 'no' | undefined;
}
const CardWrapper = styled.div`
   flex-basis: 400px;
   flex-shrink: 2;
   display: flex;
   justify-content: center;
   align-items: center;
   width: min(500px, 100%);
   animation: ${(props: CardWrapperStyleProp) => props.vote !== undefined ? (props.vote === 'yes' ? css`${voteYesKeyframe()} .75s ease-in-out` : css`${voteNoKeyframe()} .75s ease-in-out`)   : 'none'};
`;
const VoteWrapper = styled.div`
   flex-basis: 100px;
   flex-shrink: 1;
   width: min(500px, 100%);
   display: flex;
   flex-flow: row nowrap;
   justify-content: space-around;
`;
const VoteButton = styled(Button)`
   width: 100%;
   height: 100%;
   box-shadow: none;
   border: none;
   border-radius: 100%;
   outline: none;
   cursor: pointer;
   background-repeat: no-repeat;
   background-position: center;
   background-color: transparent;
`;