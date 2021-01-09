import { Link } from 'react-router-dom';


export const LobbyRoute = function() {
   return (
      <div>
         <h1>Lobby Route</h1>
         <Link to="/game/vote">Start Game</Link>
      </div>
   )
}