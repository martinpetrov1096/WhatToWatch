import { buildStyles } from 'react-circular-progressbar';
import { ISwipe } from "../../types/swipe"
import { GameCard } from "../../components/game/card";
import styled from 'styled-components';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Rating } from '../../components/game/rating';
import theme from '../../config/theme.json';
import 'react-circular-progressbar/dist/styles.css';

interface IGameOverviewProp {
   swipes: Array<ISwipe>
}

 export const GameOverview = (props: IGameOverviewProp) => {
      
   return (
      <Wrapper>
         { props.swipes.sort((a: ISwipe, b: ISwipe) => { return (b.numLikes/(b.numLikes + b.numDislikes)) - (a.numLikes/(a.numLikes + a.numDislikes))}).map((swipe: ISwipe) => {
            return (
               <CardWrapper key={swipe.id}>
                  <GameCard card={swipe} key={swipe.id}/>
                  <StatusWrapper>
                     <Rating rating={swipe.numLikes * 100 / (swipe.numLikes+swipe.numDislikes)} subtitle='User Votes'/>
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
   width: 100%;
   display: flex;
   flex-flow: row wrap;
   justify-content: center;
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


 const ProgressBar = styled(CircularProgressbar)`
   width: 50px !important;
   height: 50px;
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