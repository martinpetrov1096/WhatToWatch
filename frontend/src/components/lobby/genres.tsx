import axios from 'axios';
import { useEffect, useMemo, useCallback, useState } from 'react';
import { Socket } from 'socket.io-client';
import config from '../../config/config.json';
import * as Genres from '../../styles/components/lobby/genres';

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
            <Genres.ItemWrapper key={genre.id} >
               <Genres.Checkbox type="checkbox" 
                  name={genre.name}
                  value={genre.id}
                  id={genre.name}
                  checked={props.selectedGenres.includes(genre.id)}
                  onChange={()=>props.selectedGenres.includes(genre.id) ? delGenre(genre.id) : addGenre(genre.id)}
               />
               <Genres.Label htmlFor={genre.name}>{genre.name}</Genres.Label>
            </Genres.ItemWrapper>
         );
      });
   }, [genres, addGenre, delGenre, props.selectedGenres, props.type]);

   return (
      <Genres.Wrapper>
         <Genres.Header>Genres</Genres.Header>
         { genreElements }
      </Genres.Wrapper>
   );
}