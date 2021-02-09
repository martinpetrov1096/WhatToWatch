import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { ISwipe } from '../../types/swipe';
import config from '../../config/config.json';
import { ExtraDetails } from '../../components/game/details/extra-details';
import { InitialDetails } from '../../components/game/details/initial-details';
import { Button } from '../../styles/styled-components/global';

interface ICardProp {
   cards: Array<ISwipe>;
}
interface ParamTypes {
   cardId: string
}

export const CardDetails = (props: ICardProp) => {

   const  { cardId } = useParams<ParamTypes>();
   const history = useHistory();

   const curCard = useMemo<ISwipe | undefined>(() => {
      return props.cards.find((card) => card.id === parseInt(cardId));
   }, [cardId, props.cards]);

   const type = useMemo<'movie' | 'tv' | undefined>(() => {
      if (curCard?.original_title) {
         return 'movie';
      } else if (curCard?.original_name) {
         return 'tv';
      } else {
         return undefined;
      }
   }, [curCard]);

   const bgUrl = useMemo<string>(() => {
      if (curCard && curCard.backdrop_path) {
         return config.movieDb.bgUrl + curCard.backdrop_path;
      } else {
         history.push('/error');
         return '';
      }
   }, [curCard, history]);

   /**
    * If the current card is undefined,
    * just let the user go to the home 
    * screen via the error route
    */
   useEffect(() => {
      if (curCard === undefined) {
         history.push('/error');
      }
   }, [curCard, history]);

   return (
      <Wrapper bgUrl={bgUrl}>
         <ContentWrapper>
            <BackButton onClick={()=> history.goBack()}>Go Back</ BackButton>
            <Card>          
               <InitialDetails card={curCard} type={type}/>
               <ExtraDetails cardId={cardId} type={type}/>
            </Card>
         </ContentWrapper>   
      </Wrapper>
   );
}
///////////////////////////////////////////////////////////////////////////
////////////////////////////////// STYLES /////////////////////////////////
///////////////////////////////////////////////////////////////////////////

type DetailsStyleProps = {
   bgUrl: string;
}

const Wrapper = styled.div`
   height: 100vh;
   width: 100vw;

   &:before {
      content: '';
      z-index: 1;
      position: fixed;
      height: 100vh;
      width: 100vw;
      background-image: linear-gradient(rgba(59, 64, 107, .2), rgba(59, 64, 107, .9)), url('${(props: DetailsStyleProps) => props.bgUrl}');
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
   }
`;

const ContentWrapper = styled.div`
   backdrop-filter: blur(8px);
   background-color: transparent;
   position: relative;
   z-index: 10;
   display: flex;
   flex-flow: column nowrap;
   align-items: center;
`;

const BackButton = styled(Button)`
   position: relative;
   z-index: 10;
   align-self: flex-start;

`;

const Card = styled.div`
   margin: 300px 0;
   padding: 40px min(5%, 70px);
   box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
   border-radius: 30px;
   width: min(1500px, 90%);

   background-color: ${(props: any) => props.theme.colorPrimary };
   display: flex;
   flex-flow: column nowrap;
   align-items: flex-start;
`;