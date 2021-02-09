import Switch from 'react-switch';
import { useCallback } from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components';
import theme from '../../config/theme.json';
import { Wrapper, Title, Description } from '../../styles/styled-components/lobby';
const TypeSwitchParams = {
      checkedIcon: false,
      uncheckedIcon: false,
      offColor: theme.colorPrimaryDark,
      onColor:  theme.colorPrimaryDark,
      offHandleColor: theme.colorAccent,
      onHandleColor: theme.colorAccent,
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
         <Title>Type</Title>
         <Description>
            Choose whether to give recommendations for movies or tv-shows
         </Description>
         <TypeWrapper>
            <Category>MOVIE</Category>
            <Switch checked={props.type==='tv'} onChange={(checked) => checked ? setType('tv') : setType('movie')} {...TypeSwitchParams}/>
            <Category>TV SHOW</Category>
         </TypeWrapper>
      </Wrapper>
   );
}
///////////////////////////////////////////////////////////////////////////
////////////////////////////////// STYLES /////////////////////////////////
///////////////////////////////////////////////////////////////////////////

const TypeWrapper = styled.div`
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