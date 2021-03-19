import styled from 'styled-components';
import { Wrapper, Title, Description } from '../../styles/styled-components/lobby';


////////////////////////////////////////////////////
//////////////////// COMPONENT /////////////////////
////////////////////////////////////////////////////

export const LobbyID = (props: IIDProps) => {

   return (
      <Wrapper>
         <Title>Join Code</Title>
         <Description>
            Share the following 5 digit code with 
            friends so that they can also vote on 
            movies/tv-shows
         </Description>
         <IDWrapper>
            <Element>{props.lobbyId[0]}</Element>
            <Element>{props.lobbyId[1]}</Element>
            <Element>{props.lobbyId[2]}</Element>
            <Element>{props.lobbyId[3]}</Element>
            <Element>{props.lobbyId[4]}</Element>
         </IDWrapper>
      </Wrapper>

   );
}
////////////////////////////////////////////////////
/////////////// COMPONENT PROP TYPES ///////////////
////////////////////////////////////////////////////
interface IIDProps {
   lobbyId: string;
}
////////////////////////////////////////////////////
//////////////// STYLED COMPONENTS /////////////////
////////////////////////////////////////////////////

const IDWrapper = styled.div`
   display: flex;
   flex-flow: row nowrap;
`;
const Element = styled.h2`
   margin: 0 min(10px, 1vw);
   border-radius: 8px;
   padding: 20px;
   background-color: ${(props: any) => props.theme.colorPrimary};
   box-shadow: ${(props: any) => props.theme.boxShadowInset};
`;