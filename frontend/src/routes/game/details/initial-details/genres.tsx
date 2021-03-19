import React, { useEffect, useState } from 'react';
import { Genre, getGenres } from '../../../../utils/get-assets';
import styled from 'styled-components';


////////////////////////////////////////////////////
//////////////////// COMPONENT /////////////////////
////////////////////////////////////////////////////

export const Genres = (props: IGenresProps) => {

   const [genres, setGenres ] = useState<Genre[]>([]);
   useEffect(() => {
      if (props?.genre_ids === undefined || props.type === undefined) return;

      getGenres(props.type).then((allGenres: Genre[]) => {
         setGenres(allGenres
            .filter((genre: Genre) => props?.genre_ids?.includes(genre.id)));
      });
   }, [props.type, props?.genre_ids]);

   return (
      <GenresWrapper>
         {genres.map((g) => < GenreItem key={g.id}>{g.name}</ GenreItem>)}
      </GenresWrapper>
   );
}
////////////////////////////////////////////////////
/////////////// COMPONENT PROP TYPES ///////////////
////////////////////////////////////////////////////
interface IGenresProps {
   genre_ids: number[] | undefined;
   type: 'movie' | 'tv' | undefined;
}
////////////////////////////////////////////////////
//////////////// STYLED COMPONENTS /////////////////
////////////////////////////////////////////////////

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