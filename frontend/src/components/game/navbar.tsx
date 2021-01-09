import { Link } from 'react-router-dom';


export const GameNavbar = () => {

   return (
      <nav>
         <Link to="/game/vote">Vote</Link>
         <Link to="/game/overview">Overview</Link>
      </nav>
   );
}