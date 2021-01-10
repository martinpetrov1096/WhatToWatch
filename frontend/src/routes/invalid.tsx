import { Link } from "react-router-dom"

export const InvalidGame = () => {

   return (
      <div>
         <h1>Sorry, this URL doesn't exist</h1>
         <Link to="/">Home</Link>
      </div>
    
   )

}