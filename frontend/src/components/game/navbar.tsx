import { Link } from 'react-router-dom';


export const GameNavbar = () => {

   return (
      <nav>
         <Link to="vote">Vote</Link>
         <Link to="overview">Overview</Link>
      </nav>
   );
}