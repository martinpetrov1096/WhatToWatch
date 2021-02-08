import { color } from '../../styles/global';
import * as Type from '../../styles/components/lobby/type';
import Switch from 'react-switch';
import { useCallback } from 'react';
import { Socket } from 'socket.io-client';

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
      <Type.Wrapper>
         <Type.Category>MOVIE</Type.Category>
         <Switch checked={props.type==='tv'} onChange={(checked) => checked ? setType('tv') : setType('movie')} {...TypeSwitchParams}/>
         <Type.Category>TV SHOW</Type.Category>
      </Type.Wrapper>
   );
}