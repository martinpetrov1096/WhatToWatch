import { useParams, useHistory } from 'react-router-dom';
import { ISwipe } from '../../types/swipe';
import config from '../../config/config.json';
import * as Details from '../../styles/routes/details';
import { useState, useEffect } from 'react';
interface ICardProp {
   cards: Array<ISwipe>;
}
interface ParamTypes {
   cardId: string
}
export const CardDetails = (props: ICardProp) => {
   const  { cardId } = useParams<ParamTypes>();
   const [curCard, setCurCard] = useState<ISwipe>(props.cards[0]);
   const history = useHistory();
   
   useEffect(() => {
      setCurCard(props.cards.find((card) => card.id === parseInt(cardId)) || props.cards[0]);
   }, [cardId]);

   

   return (
      <Details.Wrapper bgUrl={config.movieDb.bgUrl + curCard.backdrop_path}>
         <Details.Blur>
            <Details.BackButton onClick={()=> history.goBack()}>Go Back</Details.BackButton>
            <Details.Card>
               <Details.PosterImage posterUrl={(config.movieDb.posterUrl + curCard.poster_path).toString()}/>
               <Details.InfoWrapper>
                  <Details.Title>{curCard.title}</Details.Title>
                  <Details.Description>{curCard.overview}</Details.Description>
               </Details.InfoWrapper>
               
            </Details.Card>

         </Details.Blur>

         

      </Details.Wrapper>
   );
}