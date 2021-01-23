import styled from 'styled-components';
import * as Global from '../global';

/**
 * Make the BG height auto, and not 100%
 * since later on when we keep adding 
 * options, things might get cluttered
 */
export const BG = styled(Global.PurpleBG)`
   display: flex;
   flex-flow: column nowrap;
   justify-content: flex-start;
   align-items: center;
   height: auto;
`;

export const Title = styled.h1`
   margin: 20px 0;
   font-size: max(5vw, 30px);
`;

export const Heading = styled.h4`
   max-width: 800px;
   font-size: max(.75vw, 12px);
   text-align: center;
`;

