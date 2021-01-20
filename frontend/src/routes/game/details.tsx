import { useParams, useHistory } from 'react-router-dom';
import { ISwipe } from '../../types/swipe';
import config from '../../config/config.json';
import genre from '../../config/genres.json';
import * as Details from '../../styles/routes/game/details';
import { buildStyles } from 'react-circular-progressbar';
import { useState, useEffect, useMemo } from 'react';
import axios, { AxiosResponse } from 'axios';
import * as Global from '../../styles/global';
import { GameExtraDetails } from '../../components/game/extra-details';
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

   const [genres, setGenres ] = useState<Array<string>>([]);

   useEffect(() => {
      if (curCard?.genre_ids === undefined) {
         setGenres([]);
      } else {
         const genres = curCard?.genre_ids.map((id) => {
            const genreName = genre[type || 'movie'].find((g) => g.id === id)?.name || '';
            return genreName;
         });
         setGenres(genres);
      }
   }, [type, curCard?.genre_ids]);

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
         return config.movieDb.posterUrl + curCard.poster_path;
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
                  <Details.GenresWrapper>
                     {genres.map((g) => <Details.GenreItem>{g}</Details.GenreItem>)}
                  </Details.GenresWrapper>
                  <Details.DescriptionVoteWrapper>
                     <Details.VoteWrapper>
                        <Details.VoteProgressBar 
                              value={(curCard?.vote_average || 0) * 10}
                              text={curCard?.vote_average?.toString()}
                              strokeWidth={20}
                              styles={buildStyles({
                                 strokeLinecap: 'butt',
                                 pathColor: Global.color.secondary,
                                 trailColor: Global.color.primaryDark
                              })}
                           />
                        <h5>User Vote</h5>
                     </Details.VoteWrapper>

                     <Details.Description>{curCard?.overview}</Details.Description>

                  </Details.DescriptionVoteWrapper>

                  <GameExtraDetails cardId={cardId} type={type}/>
               </Details.InfoWrapper>
            </Details.Card>
         </Details.ContentWrapper>


           
      </Details.Wrapper>


         


   );
}