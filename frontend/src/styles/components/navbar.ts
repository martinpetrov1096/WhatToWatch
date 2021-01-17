import styled from 'styled-components';
import * as Global from '../global';

type NavStyleProps = {
   onVoteView: boolean;
}


export const Wrapper = styled.nav`
   align-self: center;
   padding: 20px;
   width: 100%;
   max-width: 800px;
   display: flex;
   flex-flow: row nowrap;
   align-items: center;
   justify-content: space-around;
   > * { // Needed since styled-components created a div
      &:first-child {
         color: ${(props: NavStyleProps) => props.onVoteView ? Global.color.secondary : 'white'} !important;
         text-decoration: none !important;
         
         font-size: 20px;
      }
      &:nth-child(2) {
            color: ${(props: NavStyleProps) => (!props.onVoteView) ? Global.color.secondary : 'white'} !important;
            text-decoration: none;
            font-size: 20px;
         }
   }



`;

export const Link = styled.a`

`;