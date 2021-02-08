import axios from 'axios';
import { useEffect, useMemo, useCallback, useState } from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components';
import config from '../../config/config.json';
import * as Global from '../../styles/global';

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
      console.log(genres);
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
         <Header>Genres</Header>
         { genreElements }
      </Wrapper>
   );
}
///////////////////////////////////////////////////////////////////////////
////////////////////////////////// STYLES /////////////////////////////////
///////////////////////////////////////////////////////////////////////////

const Wrapper = styled.div`
   margin-bottom: 30px;

   max-width: 500px;
   height: 100%;
   display: flex;
   flex-flow: row wrap;
   justify-content: center;
   align-content: space-around;
`;

const Header = styled.h3`
   width: 100%;
   text-align: center;
   font-size: 30px;
`;

const ItemWrapper = styled.div`
   margin-top: 30px;

   flex-basis: 80px;
   flex-grow: 1;
   white-space: nowrap;
`;

const Checkbox = styled.input`
   visibility: hidden;
   :checked + label {
      background-color: ${Global.color.primaryDark};
      box-shadow: inset 2px 2px 2px #191B30;
   }
`;

const Label = styled.label`
   padding: 10px;
   border-radius: 5px;

   font-size: 14px;
   transition: ${Global.transition};

   :hover {
      background-color: ${Global.color.primaryDark};
   }
`;