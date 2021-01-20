import styled from 'styled-components';
import * as Global from '../global';

export const Wrapper = styled.div`
   width: 95%;   
   height: 100%;

   display: flex;
   flex-flow: column nowrap;
   justify-content: center;
   align-items: center;
`;

export const GoHomeButton = styled.span`
   color: ${Global.color.secondary};
`;

export const Apology = styled.h1`
   font-size: 50px;
   text-align: center;
   margin-bottom: 30px;
`;

export const Solution = styled.h3`
   font-size: 25px;
   text-align: center;
`;