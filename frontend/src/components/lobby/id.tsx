import { useMemo } from 'react';
import styled from 'styled-components';
import * as Global from '../../styles/global';

interface IIDProps {
   lobbyId: string;
}

export const LobbyID = (props: IIDProps) => {

   return (
      <Wrapper>
         <Element>{props.lobbyId[0]}</Element>
         <Element>{props.lobbyId[1]}</Element>
         <Element>{props.lobbyId[2]}</Element>
         <Element>{props.lobbyId[3]}</Element>
         <Element>{props.lobbyId[4]}</Element>
      </Wrapper>
   );
}
///////////////////////////////////////////////////////////////////////////
////////////////////////////////// STYLES /////////////////////////////////
///////////////////////////////////////////////////////////////////////////

export const Wrapper = styled.div`
   margin-bottom: 30px;
   display: flex;
   flex-flow: row nowrap;
`;

export const Element = styled.h2`
   margin: 20px min(10px, 1vw);
   border-radius: 8px;
   padding: 20px;
   background-color: ${Global.color.primaryDark};
   box-shadow: inset 2px 2px 2px #191B30;
`;

export const ShareButton = styled(Global.ButtonSecondary)`
   align-self: center;
`;