import genre from '../../config/genres.json';

interface IGenreSelectorParamTypes {
   type: 'movie' | 'tv';
   addGenre: (genreId: number) => void;
   delGenre: (genreId: number) => void;
   curGenres: Array<number>;
}

export const GenreSelector = (props: IGenreSelectorParamTypes) => {

   const genres = genre[props.type].map((genre) => {
      return (
         <div key={genre.id} >
            <input type="checkbox" name={genre.name} value={genre.id} checked={props.curGenres.includes(genre.id)} onChange={()=>props.curGenres.includes(genre.id) ? props.delGenre(genre.id) : props.addGenre(genre.id)}/>
            <label htmlFor={genre.name}>{genre.name}</label>
         </div>
      );
   });
   return (
      <div>
         {genres}
      </div>
   );
}