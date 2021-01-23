import { useState, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import * as Nav from '../../styles/components/game/navbar';


interface IGameNavbarProps {
   route: 'vote' | 'overview';
}

export const GameNavbar = (props: IGameNavbarProps) => {
   
   const history = useHistory();

  

   const navigateTo = useCallback((loc: string) => {
      history.push(loc);
   }, [history]);

   return (

      <Nav.Wrapper onVoteView={props.route==='vote'}>
         <h6 onClick={() => navigateTo('vote')}>Vote</h6>
         <h6 onClick={() => navigateTo('overview')}>Overview</h6>
      </Nav.Wrapper>
   );
}