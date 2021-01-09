import { useEffect } from "react"
import { ISwipeModel } from "../../types/swipe"
import { GameCard } from "./card";

interface IGameOverviewProp {
   swipes: Array<ISwipeModel>
}

export const GameOverview = (props: IGameOverviewProp) => {
      
   return (
      <div>
         <h1>Game Overview</h1>
         { props.swipes.map((swipe) => <GameCard card={swipe.card}/>) }
      </div>
   );
}