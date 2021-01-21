import genre from '../../config/genres.json';
import * as Genres from '../../styles/components/lobby/genres';

interface IGenreSelectorParamTypes {
   type: 'movie' | 'tv';
   addGenre: (genreId: number) => void;
   delGenre: (genreId: number) => void;
   curGenres: Array<number>;
}

export const LobbyGenres = (props: IGenreSelectorParamTypes) => {

   const genres = genre[props.type].map((genre) => {
      return (
         <Genres.ItemWrapper key={genre.id} >
            <Genres.Checkbox type="checkbox" 
               name={genre.name}
               value={genre.id}
               id={genre.name}
               checked={props.curGenres.includes(genre.id)}
               onChange={()=>props.curGenres.includes(genre.id) ? props.delGenre(genre.id) : props.addGenre(genre.id)}/>
            <Genres.Label htmlFor={genre.name}>{genre.name}</Genres.Label>
         </Genres.ItemWrapper>
      );
   });
   return (
      <Genres.Wrapper>
         <Genres.Header>Genres</Genres.Header>
         {genres}
      </Genres.Wrapper>
   );
}