import { useCallback } from "react";
import { useHistory } from "react-router-dom"
import * as Invalid from '../styles/routes/invalid';

export interface IInvalidProp {
   apology: string;
};

export const InvalidGame = (props: IInvalidProp) => {
   
   const history = useHistory();

   const goHome = useCallback(() => {
      history.push('/');
   }, [history]);

   return (
      <Invalid.Wrapper>
         <Invalid.Apology>{props.apology}</Invalid.Apology>
         <Invalid.Solution>Click <Invalid.GoHomeButton onClick={() => goHome()}>here</Invalid.GoHomeButton> to go to the home page</Invalid.Solution>
      </Invalid.Wrapper>
   );
}