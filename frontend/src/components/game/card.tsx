import { useHistory, useParams } from 'react-router-dom';
import { useCallback } from 'react';
import styled from 'styled-components';
import { ISwipe } from '../../types/swipe';
import config from '../../config/config.json';
import { Loading } from '../loading';

interface ICardProp {
   card: ISwipe | undefined;
}
interface GameCardParamTypes {
   gameId: string;
}

export const GameCard = (props: ICardProp) => {
   const { gameId } = useParams<GameCardParamTypes>();
   const history = useHistory();

   const goToDetails = useCallback(() => {
      if (props.card) {
         history.push('/game/' + gameId + '/details/' + props.card.id);
      }
   }, [props.card, gameId, history]);

   if (props.card === undefined) {
      return (<Loading/>);
   } else {
      return (
         <Main posterUrl={(config.movieDb.posterUrl + props.card.poster_path).toString()} key={props.card.id} onClick={goToDetails}/>
      );
   }
}
///////////////////////////////////////////////////////////////////////////
////////////////////////////////// STYLES /////////////////////////////////
///////////////////////////////////////////////////////////////////////////

type CardStyleProps = {
   posterUrl: string;
}

const Main = styled.div`
   padding-bottom: min(100%, 60vh);
   border-radius: 20px;
   width: 66.6%;
   max-width: 450px;

   background-image: url("${ (props: CardStyleProps) => props.posterUrl }");
   background-position: center;
   background-size: cover;
   box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);

   transition: all 1s ease-in-out;
`;