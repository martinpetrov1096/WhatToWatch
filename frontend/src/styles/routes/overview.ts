import styled from 'styled-components';
import { CircularProgressbar } from 'react-circular-progressbar';

export const Wrapper = styled.div`
   width: 100%;
   display: flex;
   flex-flow: column nowrap;
   align-items: center;
`;

export const CardWrapper = styled.div`
   flex-grow: 1;
   width: min(550px, 100%);
   height: auto;
   display: flex;
   flex-flow: row nowrap;
   justify-content: space-around;
   padding: 40px 0;

   @media only screen and (max-width: 500px) {
      flex-flow: column nowrap;
      align-items: center;
   }
`;

export const StatusWrapper = styled.div`
   width: 50px;
   display: flex;
   flex-flow: column;
   justify-content: center;
   align-items: center;

   > * {
      flex-basis: 80px;
   }
   
   @media only screen and (max-width: 500px) {
      padding-top: 20px;
      width: min(500px, 100%);
      flex-flow: row nowrap;
   }
`;




export const ProgressBar = styled(CircularProgressbar)`
   // On mobile, CircularProgressBar gets 100% width
   width: 50px !important;
   height: 50px;
`;

type PlayerVoteStyleProps = {
   vote?: 'yes' | 'no';
}

export const PlayerVote = styled.div`
   width: 50px;
   height: 50px;
   background-image: url('${(props: PlayerVoteStyleProps) => props.vote === 'no' ? 'https://cdn.glitch.com/f885813f-4542-461e-9e2c-c21e4f424ee4%2FrejectButton.e604d513.svg?v=1591586148426' : 'https://cdn.glitch.com/f885813f-4542-461e-9e2c-c21e4f424ee4%2FheartButton.1f05d0b6.svg?v=1591586129623'}');
   background-repeat: no-repeat;
`;