import { ISwipe } from "../../types/swipe"
import { GameCard } from "../../components/card";
import styled from 'styled-components';
import { Rating } from '../../components/rating';
import 'react-circular-progressbar/dist/styles.css';

interface IGameOverviewProp {
   swipes: Array<ISwipe>
}

 export const GameOverview = (props: IGameOverviewProp) => {
   
   if (props.swipes.length === 0) {
      return (
         <Wrapper>
            <NoVotes>You haven't voted on anything yet.</NoVotes>
         </Wrapper>
      );
   }

   return (
      <Wrapper>
         { props.swipes.sort((a: ISwipe, b: ISwipe) => { return (b.numLikes/(b.numLikes + b.numDislikes)) - (a.numLikes/(a.numLikes + a.numDislikes))}).map((swipe: ISwipe) => {
            return (
               <CardWrapper key={swipe.id}>
                  <GameCard card={swipe} key={swipe.id}/>
                  <StatusWrapper>
                     <Rating rating={swipe.numLikes * 10 / (swipe.numLikes+swipe.numDislikes)} subtitle='Game Votes'/>
                     <PlayerVote vote={swipe.vote}/>
                  </StatusWrapper>
               </CardWrapper> 
            );
         }) }
      </Wrapper>
   );
}
///////////////////////////////////////////////////////////////////////////
////////////////////////////////// STYLES /////////////////////////////////
///////////////////////////////////////////////////////////////////////////

const Wrapper = styled.div`
   position: relative;
   width: 100%;
   display: flex;
   flex-flow: row wrap;
   justify-content: flex-start;
`;

const NoVotes = styled.h1`
   margin-top: 300px;
   width: 100%;
   text-align: center;
   font-size: 32px;
`;

const CardWrapper = styled.div`
   width: 90%;
   max-width: 500px;
   height: auto;
   display: flex;
   flex-flow: column nowrap;
   align-items: center;
   justify-content: space-around;
   padding: 40px 0;
`;

 const StatusWrapper = styled.div`
   padding-top: 20px;
   width: min(500px, 100%);
   display: flex;
   flex-flow: row nowrap;
   justify-content: center;
   > * {
      flex-basis: 80px;
   }
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