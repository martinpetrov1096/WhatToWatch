import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

interface IGameNavbarProps {
   route: 'vote' | 'overview';
}

export const GameNavbar = (props: IGameNavbarProps) => {
   
   const history = useHistory();

   const navigateTo = useCallback((loc: string) => {
      history.push(loc);
   }, [history]);

   return (
      <Wrapper voteView={props.route==='vote'}>
         <h6 onClick={() => navigateTo('vote')}>Vote</h6>
         <h6 onClick={() => navigateTo('overview')}>Overview</h6>
      </Wrapper>
   );
}
///////////////////////////////////////////////////////////////////////////
////////////////////////////////// STYLES /////////////////////////////////
///////////////////////////////////////////////////////////////////////////

type NavStyleProps = {
   voteView: boolean;
   theme: any;
}

const Wrapper = styled.nav`
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
         color: ${(props: NavStyleProps) => props.voteView ? props.theme.colorAccent : 'white'} !important;
      }
      &:nth-child(2) {
            color: ${(props: NavStyleProps) => (!props.voteView) ? props.theme.colorAccent : 'white'} !important;
         }
   }
`;