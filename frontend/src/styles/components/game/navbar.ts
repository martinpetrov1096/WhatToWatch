import styled from 'styled-components';
import * as Global from '../../global';

type NavStyleProps = {
   onVoteView: boolean;
}

export const Wrapper = styled.nav`
   align-self: center;
   padding: 30px 0 10px 0;
   display: flex;
   flex-basis: 800px;
   flex-flow: row nowrap;
   align-items: center;
   justify-content: center;
   > h6 {
      flex-basis: 400px;
      flex-shrink: 1;
      flex-grow: 0;
      text-align: center;
      text-decoration: none;
      font-size: 20px;
   }
   > * { // Needed since styled-components created a div
      &:first-child {
         color: ${(props: NavStyleProps) => props.onVoteView ? Global.color.secondary : 'white'} !important;
      }
      &:nth-child(2) {
            color: ${(props: NavStyleProps) => (!props.onVoteView) ? Global.color.secondary : 'white'} !important;
         }
   }
`;

export const Link = styled.a`

`;