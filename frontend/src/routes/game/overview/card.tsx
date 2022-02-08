


////////////////////////////////////////////////////
//////////////////// COMPONENT /////////////////////
////////////////////////////////////////////////////

import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import { GameCard } from "../../../components/card";
import { Rating } from "../../../components/rating";
import Button from "../../../components/svg-button";
import { IGameParamTypes } from "../../../types/router";
import { ISwipe } from "../../../types/swipe";

export const GameOverviewCard = (props: IGameOverviewCardProp) => {

   const { gameId } = useParams<IGameParamTypes>();


   const rating = useMemo(() => {
      const numLikes = props.swipe.numLikes;
      const numDislikes = props.swipe.numDislikes;


      if (numLikes === 0 && numDislikes === 0) {
         return {
            'text': 'N/A',
            'value': 0
         }
      }
      return {
         'text': `${numLikes}/${numLikes + numDislikes}`,
         'value': numLikes * 10 / (numLikes + numDislikes)
      };

      //return numDislikes * 10 / (numLikes + numDislikes);


   }, [props.swipe.numLikes, props.swipe.numDislikes]);


   const vote = useCallback((vote: 'yes' | 'no') => {

      if (vote === 'yes') {
         props.socket?.emit('vote', { gameId: gameId, swipeId: props.swipe.id, vote: 'yes' });
         props.swipe.vote = 'yes';
      } else {
         props.socket?.emit('vote', { gameId: gameId, swipeId: props.swipe.id, vote: 'no' });
         props.swipe.vote = 'no';
      }

   }, [gameId, props.socket, props.swipe]);


    return (
        <CardWrapper key={props.swipe.id}>
            <GameCard card={props.swipe} key={props.swipe.id}/>
            <VoteWrapper>
               <VoteButton viewBox="0 0 295.64 295.64" width="50" height="50" onClick={()=> vote('yes')}>
                     <title>heartButton</title>
                     <path className="fill" d="M219.31,80.82c-19-16.18-47.23-13.27-64.66,
                     4.71l-6.83,7-6.82-7c-17.4-18-45.67-20.89-64.66-4.71-21.76,18.57-22.9,
                     51.9-3.43,72L140,222.09a10.86,10.86,0,0,0,15.69,0l67-69.23c19.51-20.14,
                     18.37-53.47-3.39-72Z"/>
                     <circle className="stroke" strokeWidth="10" strokeMiterlimit="10" cx="147.82" cy="147.82" r="142.82"/>
               </VoteButton>
               <Rating number={rating.value} text={rating.text} subtitle='Votes'/>
               <VoteButton viewBox="0 0 295.64 295.64" width="50" height="50" onClick={()=> vote('no')}>
                     <title>rejectButton</title>
                     <path className="fill" d="M174.56,147.52l44.05-44.05a13.85,13.85,0,0,0,
                     0-19.59l-9.79-9.79a13.86,13.86,0,0,0-19.58,0l-44.05,44.06L101.13,74.09a13.86,
                     13.86,0,0,0-19.58,0l-9.79,9.79a13.85,13.85,0,0,0,0,19.59l44.05,44.05-44,44a13.84,
                     13.84,0,0,0,0,19.58l9.79,9.8a13.86,13.86,0,0,0,19.58,0l44.06-44.06L189.24,221a13.86,
                     13.86,0,0,0,19.58,0l9.79-9.8a13.84,13.84,0,0,0,0-19.58Z"/>
                     <circle className="stroke" strokeWidth="10" strokeMiterlimit="10" cx="147.82" cy="147.82" r="142.82"/>
               </VoteButton>
            </VoteWrapper>
        </CardWrapper> 
        );

}
////////////////////////////////////////////////////
/////////////// COMPONENT PROP TYPES ///////////////
////////////////////////////////////////////////////

interface IGameOverviewCardProp {
   swipe: ISwipe,
   socket: Socket | null;
 }


////////////////////////////////////////////////////
//////////////// STYLED COMPONENTS /////////////////
////////////////////////////////////////////////////

const CardWrapper = styled.div`
   height: auto;
   display: flex;
   flex-flow: column nowrap;
   align-items: center;
   justify-content: space-around;
`;

const VoteWrapper = styled.div`
   flex: 0 0 100px;
   width: 100%;
   display: flex;
   flex-flow: row nowrap;
   justify-content: center;
   align-items: center;
`;

const VoteButton = styled(Button)`

   box-shadow: none;
   border: none;
   border-radius: 100%;
   outline: none;
   cursor: pointer;
   background-repeat: no-repeat;
   background-position: center;
   background-color: transparent;
`;

type PlayerVoteStyleProps = {
   vote?: 'yes' | 'no';
}
const PlayerVote = styled.div`
   width: 50px;
   height: 50px;
   background-image: url('${(props: PlayerVoteStyleProps) => props.vote === 'no' ? '/assets/dislike-btn.svg' : '/assets/like-btn.svg'}');
   background-repeat: no-repeat;
`;