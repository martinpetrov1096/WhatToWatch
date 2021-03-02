import styled from 'styled-components';
import config from '../../../config/config.json';

interface ICastProps {
   cast: Array<any>;
}

export const Cast = (props: ICastProps) => {

   return (
      <CastWrapper>
         {props.cast.map((c: any) => (
            <CastItem key={c.name}>
               <img src={c.profile_path ?  config.movieDb.profileUrl + c.profile_path : config.movieDb.missingProfileUrl  } alt={c.name}/>
               <div>
                  <h3>{c.name}</h3>
                  <h4>{c.character}</h4>
               </div>
            </CastItem>))}
      </CastWrapper>
   );
}
///////////////////////////////////////////////////////////////////////////
////////////////////////////////// STYLES /////////////////////////////////
///////////////////////////////////////////////////////////////////////////

const CastWrapper = styled.div`
flex-basis: 100%;
flex-grow: 1;
height: 275px;
display: flex;
flex-flow: column wrap;
overflow-x: scroll;
`;

const CastItem = styled.div`
margin: 10px;
border-radius: 10px;
width: 138px;
height: 100%;
box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
background-color: ${(props: any) => props.theme.colorPrimary};
   box-shadow: ${(props: any) => props.theme.boxShadowSmall};
display: flex;
flex-flow: column nowrap;
justify-content: flex-start;

> img {
   border-top-left-radius: 10px;
   border-top-right-radius: 10px;
}

> div {
   flex-basis: 20px;
   padding-top: 15px;
   width: 100%;
   text-align: center;
   overflow-wrap: anywhere;
   
   > h3 {
      font-size: 14px;
   }
   > h4 {
      padding-top: 10px;
      font-size: 13px;
   }
}   
`;
