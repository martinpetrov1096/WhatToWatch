import { useCallback, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';


////////////////////////////////////////////////////
//////////////////// COMPONENT /////////////////////
////////////////////////////////////////////////////

export const GameNavbar = (props: IGameNavbarProps) => {
   
   const history = useHistory();
   const location = useLocation();

   const navigateTo = useCallback((loc: string) => {
      const gameID = location.pathname.split('/')[2];
      history.push('/game/' + gameID + '/' + loc);
   }, [history, location.pathname]);
 
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
////////////////////////////////////////////////////
/////////////// COMPONENT PROP TYPES ///////////////
////////////////////////////////////////////////////

interface IGameNavbarProps {
   route: 'vote' | 'overview';
}
////////////////////////////////////////////////////
//////////////// STYLED COMPONENTS /////////////////
////////////////////////////////////////////////////

const Wrapper = styled.nav`
   width: 100%;
   border-radius: 0 0 20px 20px;
   padding: 25px 0;
   position: fixed;
   z-index: 200;
   /* backdrop-filter: blur(20px); */
   background-color: ${(props: any) => props.theme.colorPrimary};
   box-shadow: ${(props: any) => props.theme.boxShadowBig};
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
   font-size: 25px;
   
   color: ${(props: NavTextStyleProps) => props.highlight ? props.theme.colorAccent : 'white'};
   cursor: pointer;
   transition: ${(props: any) => props.theme.transition};
   :hover {
      color: ${(props: any) => props.theme.colorAccent};
   }
`;