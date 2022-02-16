import { useParams, useHistory } from 'react-router-dom';
import { useMemo } from 'react';
import styled from 'styled-components';
import { ISwipe } from '../../../types/swipe';
import config from '../../../config/config.json';
import { ExtraDetails } from './extra-details';
import { InitialDetails } from './initial-details';
import Button from '../../../components/svg-button';

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
         return '';
      }
   }, [curCard]);

   return (
      <Wrapper bgUrl={bgUrl}>
         <ContentWrapper>
            <BackButton type='back' width="75" height="75" viewBox="0 0 106 106" onClick={()=> history.goBack()}/>
            <Card>
               <InitialDetails card={curCard} type={type}/>
               <ExtraDetails cardId={cardId} type={type}/>
            </Card>
         </ContentWrapper>
      </Wrapper>
   );
}
////////////////////////////////////////////////////
/////////////// COMPONENT PROP TYPES ///////////////
////////////////////////////////////////////////////
interface ICardProp {
   cards: Array<ISwipe>;
}
interface ParamTypes {
   cardId: string
}
////////////////////////////////////////////////////
//////////////// STYLED COMPONENTS /////////////////
////////////////////////////////////////////////////

type DetailsStyleProps = {
   bgUrl: string;
}

const Wrapper = styled.div`
   position: relative;
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
   backdrop-filter: blur(20px);
   background-color: transparent;
   position: relative;
   z-index: 10;
   display: flex;
   flex-flow: column nowrap;
   align-items: center;
`;
const BackButton = styled(Button)`
   position: absolute;
   left: 0;
   margin: 15px 0 0 15px;
   z-index: 10;
`;
const Card = styled.div`
   margin: 300px 0;
   box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
   border-radius: 30px;
   width: min(1300px, 90%);
   padding: 60px min(5%, 70px);
   background-color: ${(props: any) => props.theme.colorPrimary };
   display: flex;
   flex-flow: column nowrap;
   align-items: stretch;
   justify-content: stretch;
`;