import { useParams, useHistory } from 'react-router-dom';
import { buildStyles } from 'react-circular-progressbar';
import { ISwipe } from '../../types/swipe';
import config from '../../config/config.json';
import { useState, useEffect, useMemo } from 'react';
import { GameExtraDetails } from '../../components/game/extra-details';
import styled from 'styled-components';
import { Button } from '../../styles/styled-components/global';
import { CircularProgressbar } from 'react-circular-progressbar';
import theme from '../../config/theme.json';
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
      < Wrapper bgUrl={bgUrl}>
         < ContentWrapper>
            < BackButton onClick={()=> history.goBack()}>Go Back</ BackButton>
            < Card>
               < PosterImage posterUrl={posterUrl}/>
               < InfoWrapper>
                  < Title>{curCard?.title}</ Title>
                  < GenresWrapper>
                     {genres.map((g) => < GenreItem key={g}>{g}</ GenreItem>)}
                  </ GenresWrapper>
                  < DescriptionVoteWrapper>
                     < VoteWrapper>
                        < VoteProgressBar 
                              value={(curCard?.vote_average || 0) * 10}
                              text={curCard?.vote_average?.toString()}
                              strokeWidth={20}
                              styles={buildStyles({
                                 strokeLinecap: 'butt',
                                 pathColor: theme.colorAccent,
                                 trailColor: theme.colorPrimaryDark
                              })}
                        />
                        <h5>User Vote</h5>
                     </ VoteWrapper>
                     < Description>{curCard?.overview}</ Description>
                  </ DescriptionVoteWrapper>
                  <GameExtraDetails cardId={cardId} type={type}/>
               </ InfoWrapper>
            </ Card>
         </ ContentWrapper>   
      </ Wrapper>
   );
}
///////////////////////////////////////////////////////////////////////////
////////////////////////////////// STYLES /////////////////////////////////
///////////////////////////////////////////////////////////////////////////

type DetailsStyleProps = {
   bgUrl: string;
}

const Wrapper = styled.div`
   height: 100%;
   width: 100%;

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
   box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
   border-radius: 30px;
   width: min(1500px, 100%);
   background-color: ${(props: any) => props.theme.colorPrimary };

   display: flex;
   flex-flow: row nowrap;
`;

type DetailsPosterImageProps = {
   posterUrl: string;
}

const PosterImage = styled.div`
   display: none;
   flex-basis: 40%;
   flex-grow: 1;
   flex-shrink: 1;
   border-radius: 30px 0 0 30px;
   background-image: url("${ (props: DetailsPosterImageProps) => props.posterUrl }") ;
   background-position: center;
   background-size: contain;

   @media only screen and (max-width: 900px) {
      display: none;
   }
`;

const InfoWrapper = styled.div`
   flex-grow: 1;
   flex-shrink: 2;
   padding: min(5%, 70px);
   display: flex;
   flex-flow: column nowrap;
   align-items: flex-start;
   > * {
      padding-top: 20px;
   }
`;

const Title = styled.h2`
   font-size: max(3vw, 30px);
   text-align: center;
`;

const GenresWrapper = styled.div`
   display: flex;
   flex-flow: row wrap;
`;

const GenreItem = styled.h4`
   margin: 5px;
   border-radius: 5px;
   padding: 10px;
   background-color: ${(props: any) => props.theme.colorPrimaryDark};

`;

const DescriptionVoteWrapper = styled.div`
   width: 100%;
   display: flex;
   flex-flow: row nowrap;
   justify-content: space-around;
   align-items: center;
   @media (max-width: 500px) {
      flex-flow: column;
      justify-content: space-around;
      align-items: space-around;
   }
`;

const Description = styled.p`
   padding: 30px;
   font-size: 14px;
   line-height: 1.2
`;

const VoteWrapper = styled.div`
   flex-shrink: 0;
   flex-basis: 80px !important;

   > h5 {
      margin-top: 10px;
      font-size: 12px;
      text-align: center;
   }
`;

const VoteProgressBar = styled(CircularProgressbar)`
   height: 50px;
`;
