import styled from 'styled-components';
import { CircularProgressbar } from 'react-circular-progressbar';

export const Wrapper = styled.div`
   width: 100%;
   display: flex;
   flex-flow: row wrap;
   justify-content: center;
`;

export const CardWrapper = styled.div`
   width: 90%;
   max-width: 500px;
   height: auto;
   display: flex;
   flex-flow: column nowrap;
   align-items: center;
   justify-content: space-around;
   padding: 40px 0;
`;

export const StatusWrapper = styled.div`
   padding-top: 20px;
   width: min(500px, 100%);
   display: flex;
   flex-flow: row nowrap;
   justify-content: center;
   align-items: center;

   > * {
      flex-basis: 80px;
   }
`;


export const ProgressBar = styled(CircularProgressbar)`
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