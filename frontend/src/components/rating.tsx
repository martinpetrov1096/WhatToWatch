import styled from 'styled-components';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import theme from '../config/theme.json';

interface IRatingProps {
   rating: number | undefined;
   subtitle: string;
}

export const Rating = (props: IRatingProps) => {

   return (
      <RatingWrapper>
         <RatingProgressBar 
            value={(props.rating || 0) * 10}
            text={(((props?.rating ?? 0) * 10)?.toString())}
            strokeWidth={20}
            styles={buildStyles({
               strokeLinecap: 'butt',
               pathColor: theme.colorAccent,
               trailColor: theme.colorPrimaryDark
            })}
         />
         <Subtitle>{props.subtitle}</Subtitle>
      </RatingWrapper>
   );
}
///////////////////////////////////////////////////////////////////////////
////////////////////////////////// STYLES /////////////////////////////////
///////////////////////////////////////////////////////////////////////////


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