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
        <LoadMore onClick={() => props.socket?.emit('genNewSwipes')}>
            Load More
        </LoadMore>
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
   margin-top: 50px;
   width: 100%;
   display: grid;
   grid-template-columns: repeat(auto-fit, 450px);
   gap: 50px;
   justify-content: center;
`;
const LoadMore = styled.div`
   width: 100%;
   height: 200px;
   max-width: 450px;
   display: flex;
   flex-flow: column nowrap;
   align-items: center;
   justify-content: center;
   cursor: pointer;
   :hover {
      color: ${(props) => props.theme.colorAccent};
   }
`;