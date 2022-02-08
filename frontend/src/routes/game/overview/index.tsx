import { ISwipe } from "../../../types/swipe"
import { GameCard } from "../../../components/card";
import styled from 'styled-components';
import { Rating } from '../../../components/rating';
import 'react-circular-progressbar/dist/styles.css';
import { useCallback } from "react";
import { Socket } from "socket.io-client";
import { GameOverviewCard } from "./card";


////////////////////////////////////////////////////
//////////////////// COMPONENT /////////////////////
////////////////////////////////////////////////////

export const GameOverview = (props: IGameOverviewProp) => {
   

    return (
      <Wrapper>
        { props.swipes.sort((a: ISwipe, b: ISwipe) => { return (b.numLikes/(b.numLikes + b.numDislikes)) - (a.numLikes/(a.numLikes + a.numDislikes))}).map((swipe: ISwipe) => {
            return <GameOverviewCard swipe={swipe} socket={props.socket}/>
        }) }
      </Wrapper>
   );
}
////////////////////////////////////////////////////
/////////////// COMPONENT PROP TYPES ///////////////
////////////////////////////////////////////////////

interface IGameOverviewProp {
   swipes: Array<ISwipe>,
   socket: Socket | null;
}
////////////////////////////////////////////////////
//////////////// STYLED COMPONENTS /////////////////
////////////////////////////////////////////////////

const Wrapper = styled.div`
   width: 100%;
   display: grid;
   grid-template-columns: repeat(auto-fit, 450px);
   gap: 50px;
   justify-content: center;
`;