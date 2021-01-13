import { ISwipe } from "../../types/swipe"
import { GameCard } from "./card";

interface IGameOverviewProp {
   swipes: Array<ISwipe>
}

export const GameOverview = (props: IGameOverviewProp) => {
      
   return (
      <div>
         <h1>Game Overview</h1>
         { props.swipes.map((swipe) => <GameCard card={swipe} key={swipe.id}/>) }
      </div>
   );
}