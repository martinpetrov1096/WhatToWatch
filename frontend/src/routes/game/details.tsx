import { useParams, useHistory } from 'react-router-dom';
import { ISwipe } from '../../types/swipe';
import config from '../../config/config.json';
import * as Details from '../../styles/routes/game/details';
import { useState, useEffect, useMemo } from 'react';
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

   const bgUrl = useMemo<string>(() => {
      if (curCard && curCard.backdrop_path) {
         return config.movieDb.bgUrl + curCard.backdrop_path;
      } else {
         history.push('/error');
         return '';
      }
   }, [curCard, history]);

   const posterUrl = useMemo<string>(() => {
      if (curCard && curCard.poster_path) {
         return config.movieDb.bgUrl + curCard.poster_path;
      } else {
         history.push('/error');
         return '';
      }
   }, [curCard, history]);

   useEffect(() => {
      if (curCard === undefined) {
         console.log(curCard);
         history.push('/error');
      }
   }, [curCard, history]);


   return (
      <Details.Wrapper bgUrl={bgUrl}>
         <Details.ContentWrapper>
            <Details.BackButton onClick={()=> history.goBack()}>Go Back</Details.BackButton>
            <Details.Card>
               <Details.PosterImage posterUrl={posterUrl}/>
               <Details.InfoWrapper>
                  <Details.Title>{curCard?.title}</Details.Title>
                  <Details.Description>{curCard?.overview}</Details.Description>
               </Details.InfoWrapper>
               
            </Details.Card>
         </Details.ContentWrapper>


           
      </Details.Wrapper>


         


   );
}