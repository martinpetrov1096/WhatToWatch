import styled from 'styled-components';
import * as Global from '../global';


export const Wrapper = styled.div`
   display: flex;
   flex-flow: column nowrap;
   align-items: center;
`;

export const CardWrapper = styled.div`
   width: min(500px, 100%);

   display: flex;
   flex-flow: row nowrap;
   justify-content: center;
   padding: 40px 0;
`;