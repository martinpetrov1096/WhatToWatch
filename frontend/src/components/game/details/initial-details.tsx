import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ISwipe } from '../../../types/swipe';
import config from '../../../config/config.json';
import { Rating } from '../../game/rating';

interface IInitialDetailsProps {
   card: ISwipe | undefined;
   type: 'movie' | 'tv' | undefined;
}

export const InitialDetails = (props: IInitialDetailsProps) => {
   
   const [genres, setGenres ] = useState<Array<string>>([]);
   useEffect(() => {
      axios.get(config.server.apiUrl + '/info/genres')
         .then((res) => {
            const allGenres = res.data;

            if (props.card?.genre_ids === undefined) {
               setGenres([]);
            } else {
               const curMovieGenres = props.card?.genre_ids.map((id) => {
                  return allGenres[ props.type ?? 'movie'].find((g: any) => g.id === id)?.name || '';
               });
               setGenres(curMovieGenres);
            }
         })
         .catch((err) => {
            console.error('Could not get genres from server');
         });
   }, [props.type, props.card?.genre_ids]);

   return (
      <Wrapper>
         <TitleRatingWrapper>
            <Title>{props.card?.title}</ Title>
            <Rating rating={props.card?.vote_average} subtitle={'Audience Score'}/>
         </TitleRatingWrapper>
         <GenresWrapper>
            {genres.map((g) => < GenreItem key={g}>{g}</ GenreItem>)}
         </GenresWrapper>
         <Description>{props.card?.overview}</ Description>
      </Wrapper>
   );
};
///////////////////////////////////////////////////////////////////////////
////////////////////////////////// STYLES /////////////////////////////////
///////////////////////////////////////////////////////////////////////////

const Wrapper = styled.div`
   align-self: center;
   display: flex;
   flex-flow: column nowrap;
`;

const TitleRatingWrapper = styled.div`
   width: 100%;
   display: flex;
   flex-flow: row wrap;
   align-items: center;
`;

const Title = styled.h2`
   margin-right: 30px;
   align-self: center;
   font-size: max(3vw, 30px);
   text-align: center;
`;
const GenresWrapper = styled.div`
   display: flex;
   flex-flow: row wrap;
`;

const GenreItem = styled.h4`
   margin-right: 10px;
   border-radius: 5px;
   padding: 10px;
   background-color: ${(props: any) => props.theme.colorPrimaryDark};
`;

const Description = styled.p`
   padding: 30px 0;
   font-size: 14px;
   line-height: 1.2
`;
