import { useMemo } from 'react';
import styled from 'styled-components';
import config from '../../../../config/config.json';


////////////////////////////////////////////////////
//////////////////// COMPONENT /////////////////////
////////////////////////////////////////////////////

export const Cast = (props: ICastProps) => {



   return (
      <CastWrapper>
         {props.cast.map((c: any) => (
            <CastItem key={c.name}>
               <CastImage src={c.profile_path ?  config.movieDb.profileUrl + c.profile_path : config.movieDb.missingProfileUrl  } alt={c.name}/>
               <CastName>{c.name}</CastName>
               <CastCharacter>{c.character}</CastCharacter>
            </CastItem>))}
      </CastWrapper>
   );
}
////////////////////////////////////////////////////
/////////////// COMPONENT PROP TYPES ///////////////
////////////////////////////////////////////////////
interface ICastProps {
   cast: Array<any>;
}
////////////////////////////////////////////////////
//////////////// STYLED COMPONENTS /////////////////
////////////////////////////////////////////////////

const CastWrapper = styled.div`
   width: 100%;
   display: grid;
   grid-template-columns: repeat(auto-fit, 155px);
   grid-auto-flow: column;
   overflow-x: scroll;
`;
const CastItem = styled.div`
   margin: 10px;
   border-radius: 10px;
   height: 100%;
   width: 138px;

   text-align: center;
   background-color: ${(props: any) => props.theme.colorPrimary};
   box-shadow: ${(props: any) => props.theme.boxShadowSmall};
   display: flex;
   flex-flow: column nowrap;
   justify-content: flex-start;
   align-items: center;
`;
const CastImage = styled.img`
   align-self: stretch;
   border-radius: 10px 10px 0 0;
`;
const CastName = styled.h3`
   padding-top: 15px;
   font-size: 14px;
`;
const CastCharacter = styled.h4`
   padding-top: 10px;
   font-size: 13px;
`;