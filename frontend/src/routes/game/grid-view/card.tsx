


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
      const revote = props.swipe.vote === 'yes' || props.swipe.vote === 'no';
      
      /**
       * Not allowed to revote if your vote is the same thign
       */
      if (revote && props.swipe.vote === vote) {
         return;
      }


      if (vote === 'yes') {
         props.socket?.emit('vote', { gameId: gameId, swipeId: props.swipe.id, vote: 'yes', revote: revote});
         props.swipe.vote = 'yes';
      } else {
         props.socket?.emit('vote', { gameId: gameId, swipeId: props.swipe.id, vote: 'no', revote: revote });
         props.swipe.vote = 'no';
      }

   }, [gameId, props.socket, props.swipe]);


    return (
        <CardWrapper key={props.swipe.id}>
            <GameCard card={props.swipe} key={props.swipe.id}/>
            <VoteWrapper>
               <VoteButton type='dislike' vote={props.swipe.vote} viewBox="0 0 295.64 295.64" width="50" height="50" onClick={()=> vote('no')}/>
               <Rating number={rating.value} text={rating.text} subtitle='Votes'/>
               <VoteButton type='like' vote={props.swipe.vote} viewBox="0 0 295.64 295.64" width="50" height="50" onClick={()=> vote('yes')}/>
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
type PlayerVoteStyleProps = {
   vote?: 'yes' | 'no';
   theme: any;
}
const VoteButton = styled(Button)<PlayerVoteStyleProps>`
   background-repeat: no-repeat;
   background-position: center;
   background-color: transparent;

   .stroke {
         stroke: ${(props: any) => (props.type === 'like' && props.vote === 'yes') || (props.type === 'dislike' && props.vote === 'no') ? props.theme.colorAccent : 'white'};
      }
   .fill {
         fill: ${(props: any) => (props.type === 'like' && props.vote === 'yes') || (props.type === 'dislike' && props.vote === 'no') ? props.theme.colorAccent : 'white'};
      }
`;

