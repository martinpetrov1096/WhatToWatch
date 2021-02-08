import { color } from '../../styles/global';

import Switch from 'react-switch';
import { useCallback } from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components';

const TypeSwitchParams = {
      checkedIcon: false,
      uncheckedIcon: false,
      offColor: color.primaryDark,
      onColor: color.primaryDark,
      offHandleColor: color.secondary,
      onHandleColor: color.secondary,
      height: 22,
      handleDiameter: 26
}

interface LobbyTypeProps {
   type: 'tv' | 'movie';
   socket: Socket;
}

export const LobbyType = (props: LobbyTypeProps) => {

   const setType = useCallback((newType: 'movie' | 'tv') => {
      props.socket.emit('changeType', newType);
   }, [props.socket]);

   return (
      <Wrapper>
         <Category>MOVIE</Category>
         <Switch checked={props.type==='tv'} onChange={(checked) => checked ? setType('tv') : setType('movie')} {...TypeSwitchParams}/>
         <Category>TV SHOW</Category>
      </Wrapper>
   );
}
///////////////////////////////////////////////////////////////////////////
////////////////////////////////// STYLES /////////////////////////////////
///////////////////////////////////////////////////////////////////////////

const Wrapper = styled.div`
   margin-bottom: 30px;
   display: flex;
   flex-flow: row nowrap;
   align-items: center;
`;

const Category = styled.h3`
   margin: 0 10px;
   font-size: 18px;
   text-align: center;
`;