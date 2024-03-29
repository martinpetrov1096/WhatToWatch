import styled from 'styled-components';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import theme from '../config/theme.json';

////////////////////////////////////////////////////
//////////////////// COMPONENT /////////////////////
////////////////////////////////////////////////////


export const Rating = (props: IRatingProps) => {


   return (
      <RatingWrapper>
         <RatingProgressBar 
            value={(props.number || 0) * 10}
            text={props.text}
            strokeWidth={20}
            styles={buildStyles({
               strokeLinecap: 'butt',
               pathColor: theme.colorAccent,
               trailColor: theme.colorPrimaryDark
            })}
         />
         {/* <Subtitle>{props.subtitle}</Subtitle> */}
      </RatingWrapper>
   );
}
////////////////////////////////////////////////////
/////////////// COMPONENT PROP TYPES ///////////////
////////////////////////////////////////////////////

interface IRatingProps {
   number: number | undefined;
   text: string;
   subtitle: string;
}
////////////////////////////////////////////////////
//////////////// STYLED COMPONENTS /////////////////
////////////////////////////////////////////////////

const RatingWrapper = styled.div`
   display: flex;
   flex-flow: column nowrap;
   align-items: center;
`;
const RatingProgressBar = styled(CircularProgressbar)`
   margin: 0 10px;
   height: 50px;
   width: 50px;
`;
const Subtitle = styled.h6`
   margin-top: 10px;
   font-size: 12px;
   text-align: center;
`;