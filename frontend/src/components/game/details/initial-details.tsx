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
         .catch(() => {
            console.error('Could not get genres from server');
         });
   }, [props.type, props.card?.genre_ids]);

   return (
      <Wrapper>
         <Title>{props.card?.title}</ Title>
         <GenresWrapper>
            {genres.map((g) => < GenreItem key={g}>{g}</ GenreItem>)}
         </GenresWrapper>
         <DescriptionRatingWrapper>
            <Rating rating={props.card?.vote_average} subtitle={'Audience Score'}/>
            <Description>{props.card?.overview}</ Description>
         </DescriptionRatingWrapper>
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
   > * {
      margin: 10px 0;
   }
`;

const Title = styled.h2`
   align-self: center;
   font-size: max(4vw, 30px);
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

const DescriptionRatingWrapper = styled.div`
   width: 100%;
   display: flex;
   flex-flow: row wrap;
   align-items: center;
   justify-content: space-between;
`;

const Description = styled.p`
   flex: 1 1 80%;
   padding: 30px 10px;
   font-size: 14px;
   line-height: 1.5;
`;
