import { useCallback } from "react"

interface IMinRatingParamTypes {
   curMinRating: number;
   changeMinRating: (minRating: number) => void;
}

export const MinRating = (props: IMinRatingParamTypes) => {

   const handleChange = useCallback((event: any) => {
      props.changeMinRating(parseInt(event.target.value));
   }, []);

   return (
      <div>
         <button onClick={() => props.changeMinRating(props.curMinRating-1)}>-</button>
         <input type="text" value={props.curMinRating} onChange={handleChange}/>
         <button onClick={() => props.changeMinRating(props.curMinRating+1)}>-</button>
      </div>
   );

}