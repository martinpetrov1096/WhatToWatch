import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { config } from '../config/config';

export const HomeRoute = function() {

   const [joinCode, _setJoinCode] = useState<string>('');
   const [validCode, setValidCode] = useState<boolean>(false)

   /**
    * These two functions are just used to
    * wrap the setJoinCode so that we can
    * check that it's the proper length
    */
   const setJoinCode = (code: string) => {
      if (code.length <= 5) {
         _setJoinCode(code);
      }
   }
   const handleJoinCodeChange = (event: any) => {
      setJoinCode(event.target.value);
   }

   /**
    * newGame should use useRef vs useState
    * since it isn't ever being updated to the 
    * dom
    */
   const newGame = useRef(() => {
      axios.post('http://' + config.server.url + '/game')
         .then((res) => {
            if (res.status === 200) {
               setJoinCode(res.data.id);
            }
         })
         .catch((err)=> {
            console.log(err);
         });
   });

   /**
    * Check if join code is valid each time it
    * changes its value. 
    */
   useEffect(() => {
      axios.get('http://' + config.server.url + '/game', {
         params: {
            id: joinCode
         }
      }).then((res) => {
         if (res.status === 200) {
            setValidCode(true);
         } else {
            setValidCode(false);
         }
      }).catch(() => {
         setValidCode(false);
      })
   }, [joinCode]);

   return (
      <div>
         <h1>WhatToWatch</h1>
         <h3>Valid Code: {validCode.toString()}</h3>
         <button onClick={newGame.current}>New</button>

         <input type="text" value={joinCode} onChange={handleJoinCodeChange}/>
         <h3>{joinCode}</h3>
         <Link to={'/lobby/' + joinCode}>
            <button disabled={!validCode}>Join</button>
         </Link>
      </div>
   )
}