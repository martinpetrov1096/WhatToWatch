import { buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { ISwipe } from "../../types/swipe"
import { GameCard } from "../../components/game/card";
import * as Overview from '../../styles/routes/game/overview';
import * as Global from '../../styles/global';
interface IGameOverviewProp {
   swipes: Array<ISwipe>
}

export const GameOverview = (props: IGameOverviewProp) => {
      
   return (
      <Overview.Wrapper>
         { props.swipes.sort((a: ISwipe, b: ISwipe) => { return (b.numLikes/(b.numLikes + b.numDislikes)) - (a.numLikes/(a.numLikes + a.numDislikes))}).map((swipe: ISwipe) => {
            return (
               <Overview.CardWrapper key={swipe.id}>
                  <GameCard card={swipe} key={swipe.id}/>
                  <Overview.StatusWrapper>
                     <Overview.ProgressBar 
                        value={swipe.numLikes * 100 / (swipe.numLikes+swipe.numDislikes)}
                        text={swipe.numLikes.toString() + '/' + (swipe.numLikes + swipe.numDislikes).toString()}
                        strokeWidth={20}
                        styles={buildStyles({
                           strokeLinecap: 'butt',
                           pathColor: Global.color.secondary,
                           trailColor: Global.color.primaryDark
                        })}
                     />
                     <Overview.PlayerVote vote={swipe.vote}/>
                  </Overview.StatusWrapper>
               </Overview.CardWrapper> 
            );
         }) }
      </Overview.Wrapper>
   );
}

// swipes.sort((a: ISwipe, b: ISwipe) => {})