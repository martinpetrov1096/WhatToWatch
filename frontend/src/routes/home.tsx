import { Link } from 'react-router-dom';

export const HomeRoute = function() {
   return (
      <div>
         <h1>Home</h1>
         <Link to="/lobby">Go to Lobby</Link>
      </div>
   )
}