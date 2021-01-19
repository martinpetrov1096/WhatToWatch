import styled from 'styled-components';
import * as Global from '../../global';

export const Wrapper = styled.div`
   margin-bottom: 30px;
   display: flex;
   flex-flow: row nowrap;
`;

export const Element = styled.h2`
   margin: 20px min(10px, 1vw);
   border-radius: 8px;
   padding: 20px;
   background-color: ${Global.color.primaryDark};
   box-shadow: inset 2px 2px 2px #191B30;
`;

export const ShareButton = styled(Global.ButtonSecondary)`
   align-self: center;
`;