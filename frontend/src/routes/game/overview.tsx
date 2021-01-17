import { ISwipe } from "../../types/swipe"
import { GameCard } from "../../components/game/card";
import * as Overview from '../../styles/routes/overview';
interface IGameOverviewProp {
   swipes: Array<ISwipe>
}

export const GameOverview = (props: IGameOverviewProp) => {
      
   return (
      <Overview.Wrapper>
         { props.swipes.map((swipe) => {
            return (
               <Overview.CardWrapper>
                  <GameCard card={swipe} key={swipe.id}/>
               </Overview.CardWrapper> 
            );
         }) }
      </Overview.Wrapper>
   );
}