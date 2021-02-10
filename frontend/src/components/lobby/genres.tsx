import axios from 'axios';
import { useEffect, useMemo, useCallback, useState } from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components';
import config from '../../config/config.json';
import { Wrapper, Title, Description } from '../../styles/styled-components/lobby';
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

   const [genres, setGenres] = useState<any>(null);
   useEffect(() => {
      axios.get(config.server.apiUrl + '/info/genres')
         .then((res) => {
            console.log(res.data);
            setGenres(res.data);
         })
         .catch((err) => {
            console.error('Could not get genres from server');
         })
   }, []);

   const genreElements = useMemo(() => {

      /**
       * If genres promise hasn't fullfilled yet,
       * just return null
       */
      if (!genres) {
         return null;
      } 
      if (genres[props.type] === null) {
         return null;
      }
      return genres[props.type].map((genre: any) => {
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
   }, [genres, addGenre, delGenre, props.selectedGenres, props.type]);

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

/* 
   :hover {
      background-color: ${(props: any) => props.theme.colorPrimaryDark};
   } */
`;