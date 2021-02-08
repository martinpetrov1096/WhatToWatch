import { useParams, useHistory } from 'react-router-dom';
import { buildStyles } from 'react-circular-progressbar';
import { ISwipe } from '../../types/swipe';
import config from '../../config/config.json';
import { useState, useEffect, useMemo } from 'react';
import { GameExtraDetails } from '../../components/game/extra-details';
import * as Details from '../../styles/routes/game/details';
import * as Global from '../../styles/global';
import axios from 'axios';

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
      axios.get(config.server.apiUrl + '/info/genres')
         .then((res) => {
            const allGenres = res.data;

            if (curCard?.genre_ids === undefined) {
               setGenres([]);
            } else {
               const curMovieGenres = curCard?.genre_ids.map((id) => {
                  const genreName = allGenres[type || 'movie'].find((g: any) => g.id === id)?.name || '';
                  return genreName;
               });
               setGenres(curMovieGenres);
            }
         })
         .catch((err) => {
            console.error('Could not get genres from server');
         });
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
                     {genres.map((g) => <Details.GenreItem key={g}>{g}</Details.GenreItem>)}
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