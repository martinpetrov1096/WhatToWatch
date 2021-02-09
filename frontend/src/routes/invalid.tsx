import { useCallback } from "react";
import { useHistory } from "react-router-dom"
import styled from 'styled-components';
interface IInvalidProp {
   apology: string;
};

export const InvalidGame = (props: IInvalidProp) => {
   
   const history = useHistory();

   const goHome = useCallback(() => {
      history.push('/');
   }, [history]);

   return (
      <Wrapper>
         <Apology>{props.apology}</Apology>
         <Solution>Click <GoHomeButton onClick={() => goHome()}>here</GoHomeButton> to go to the home page</Solution>
      </Wrapper>
   );
}
///////////////////////////////////////////////////////////////////////////
////////////////////////////////// STYLES /////////////////////////////////
///////////////////////////////////////////////////////////////////////////

const Wrapper = styled.div`
   width: 95%;   
   height: 100%;

   display: flex;
   flex-flow: column nowrap;
   justify-content: center;
   align-items: center;
`;

const GoHomeButton = styled.span`
   color: ${(props: any) => props.theme.colorAccent};
`;

const Apology = styled.h1`
   font-size: 50px;
   text-align: center;
   margin-bottom: 30px;
`;

const Solution = styled.h3`
   font-size: 25px;
   text-align: center;
`;