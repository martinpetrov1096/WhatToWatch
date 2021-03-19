import { useCallback, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';

interface IGameNavbarProps {
   route: 'vote' | 'overview';
}

export const GameNavbar = (props: IGameNavbarProps) => {
   
   const history = useHistory();
   const location = useLocation();
   const navigateTo = useCallback((loc: string) => {
      history.push(loc);
   }, [history]);
   console.log(location.pathname.split('/').slice(-1)[0]);

   const currentView = useMemo(() => {
      return location.pathname.split('/').slice(-1)[0];
   }, [location.pathname]); 


   return (
      <Wrapper>
         <NavText highlight={currentView === 'vote'} onClick={() => navigateTo('vote')}>Vote</NavText>
         <NavText highlight={currentView === 'overview'} onClick={() => navigateTo('overview')}>Overview</NavText>
      </Wrapper>
   );
}
///////////////////////////////////////////////////////////////////////////
////////////////////////////////// STYLES /////////////////////////////////
///////////////////////////////////////////////////////////////////////////



const Wrapper = styled.nav`
   align-self: center;
   padding: 30px 0 10px 0;
   display: flex;
   flex-basis: 800px;
   flex-flow: row nowrap;
   align-items: center;
   justify-content: center;
`;

type NavTextStyleProps = {
   highlight: boolean; 
   theme: any;
}

const NavText = styled.h6`
   flex-basis: 400px;
   flex-shrink: 1;
   flex-grow: 0;
   text-align: center;
   text-decoration: none;
   font-size: 20px;
   color: ${(props: NavTextStyleProps) => props.highlight ? props.theme.colorAccent : 'white'};
`;