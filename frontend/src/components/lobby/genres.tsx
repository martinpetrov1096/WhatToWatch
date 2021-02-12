import { useEffect, useMemo, useCallback, useState } from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components';
import { Wrapper, Title, Description } from '../../styles/styled-components/lobby';
import { Genre, getGenres } from '../../utils/get-assets';
interface IGenreSelectorParamTypes {
   type: 'movie' | 'tv';
   socket: Socket;
   selectedGenres: Array<number>;
}

export const LobbyGenres = (props: IGenreSelectorParamTypes) => {

   const addGenre = useCallback((genreId: number) => {
      props.socket.emit('addGenre', genreId);
      console.log('adding genre');
   }, [props.socket]);

   const delGenre = useCallback((genreId: number) => {
      props.socket.emit('delGenre', genreId);
      console.log('deleting genre');
   }, [props.socket]);

   const [genres, setGenres] = useState<Genre[]>();
   useEffect(() => {
      getGenres(props.type).then((genres: Genre[]) => {
         setGenres(genres);
      });
   }, [props.type]);


   const genreElements = useMemo(() => {

      /**
       * If genres promise hasn't fullfilled yet,
       * just return null
       */
      if (!genres) {
         return null;
      }
      return genres.map((genre: any) => {
         return (
            <ItemWrapper key={genre.id} >
               <Checkbox type="checkbox" 
                  name={genre.name}
                  value={genre.id}
                  id={genre.name}
                  checked={props.selectedGenres.includes(genre.id)}
                  onChange={()=>props.selectedGenres.includes(genre.id) ? delGenre(genre.id) : addGenre(genre.id)}
               />
               <Label htmlFor={genre.name}>{genre.name}</Label>
            </ItemWrapper>
         );
      });
   }, [genres, addGenre, delGenre, props.selectedGenres]);

   return (
      <Wrapper>
         <Title>Genres</Title>
         <Description>
            Filter results to only recommend movie/tv shows
            that are of certain genres
         </Description>
         <ItemsWrapper>
            { genreElements }
         </ItemsWrapper>
      </Wrapper>
   );
}
///////////////////////////////////////////////////////////////////////////
////////////////////////////////// STYLES /////////////////////////////////
///////////////////////////////////////////////////////////////////////////

const ItemsWrapper = styled.div`
   margin-top: 20px;
   height: 100%;
   display: flex;
   flex-flow: row wrap;
   justify-content: center;
   align-content: space-around;
   align-items: center;
`;

const ItemWrapper = styled.div`
   margin-bottom: 50px;
   flex-basis: 80px;
   flex-grow: 1;
   white-space: nowrap;
`;

const Checkbox = styled.input`
   visibility: hidden;
   :checked + label {
      box-shadow: ${(props: any) => props.theme.boxShadowInset};
   }
`;

const Label = styled.label`
   border-radius: 10px;
   padding: 15px;
   font-size: 14px;
   transition: ${(props: any) => props.theme.transition};
   text-align: center;
`;