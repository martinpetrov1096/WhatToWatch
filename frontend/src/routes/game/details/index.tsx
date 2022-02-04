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
            <BackButton width="75" height="75" viewBox="0 0 106 106" onClick={()=> history.goBack()}>
               <path d="M53 104.5C81.4427 104.5 104.5 81.4427 104.5 53C104.5 24.5573 81.4427
                1.5 53 1.5C24.5573 1.5 1.5 24.5573 1.5 53C1.5 81.4427 24.5573 104.5 53 
                104.5Z" className="stroke" strokeWidth="3" strokeMiterlimit="10"/>
               <path d="M25.5251 50.5251C24.1583 51.892 24.1583 54.108 25.5251 55.4749L47.799
                77.7487C49.1658 79.1156 51.3819 79.1156 52.7487 77.7487C54.1156 76.3819 54.1156 
                74.1658 52.7487 72.799L32.9497 53L52.7487 33.201C54.1156 31.8342 54.1156 29.6181
                 52.7487 28.2513C51.3819 26.8844 49.1658 26.8844 47.799 28.2513L25.5251 
                 50.5251ZM78 49.5L28 49.5V56.5L78 56.5V49.5Z" className="fill"/>
            </BackButton>
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