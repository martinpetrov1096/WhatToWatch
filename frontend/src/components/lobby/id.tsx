import * as ID from '../../styles/components/lobby/id';

interface IIDProps {
   lobbyId: string;
}

export const LobbyID = (props: IIDProps) => {

   return (
      <ID.Wrapper>
         <ID.Element>{props.lobbyId[0]}</ID.Element>
         <ID.Element>{props.lobbyId[1]}</ID.Element>
         <ID.Element>{props.lobbyId[2]}</ID.Element>
         <ID.Element>{props.lobbyId[3]}</ID.Element>
         <ID.Element>{props.lobbyId[4]}</ID.Element>
      </ID.Wrapper>
   );
}