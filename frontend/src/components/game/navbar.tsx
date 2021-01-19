import { useState, useEffect, useCallback } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import * as Nav from '../../styles/components/game/navbar';
export const GameNavbar = () => {
   const history = useHistory();
   const location = useLocation();
   const [onVoteView, setOnVoteView] = useState(location.pathname.includes('vote'));

   const navigateTo = useCallback((loc: string) => {
      history.push(loc);
      setOnVoteView(loc === 'vote');
   }, [history]);

   return (

      <Nav.Wrapper onVoteView={onVoteView}>
         <h6 onClick={() => navigateTo('vote')}>Vote</h6>
         <h6 onClick={() => navigateTo('overview')}>Overview</h6>
      </Nav.Wrapper>

   );
}