import styled from 'styled-components';
import * as Global from '../../global';
import { CircularProgressbar } from 'react-circular-progressbar';


export type DetailsStyleProps = {
   bgUrl: string;
}

export const Wrapper = styled.div`
   height: 100%;
   width: 100%;

   &:before {
      content: '';
      z-index: 1;
      position: fixed;
      height: 100vh;
      width: 100vw;
      background-image: linear-gradient(rgba(59, 64, 107, .2), rgba(59, 64, 107, .9)), url('${(props: DetailsStyleProps) => props.bgUrl}');
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
   }
`;

export const ContentWrapper = styled.div`
   backdrop-filter: blur(8px);
   background-color: transparent;
   position: relative;
   z-index: 10;
   display: flex;
   flex-flow: column nowrap;
   align-items: center;
`;

export const BackButton = styled(Global.Button)`
   position: relative;
   z-index: 10;
   align-self: flex-start;

`;

export const Card = styled.div`
   margin: 300px 0;
   box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
   border-radius: 30px;
   width: min(1500px, 100%);
   background-color: ${Global.color.primary};

   display: flex;
   flex-flow: row nowrap;


`;

type DetailsPosterImageProps = {
   posterUrl: string;
}

export const PosterImage = styled.div`
   display: none;
   flex-basis: 40%;
   flex-grow: 1;
   flex-shrink: 1;
   border-radius: 30px 0 0 30px;
   background-image: url("${ (props: DetailsPosterImageProps) => props.posterUrl }") ;
   background-position: center;
   background-size: contain;

   @media only screen and (max-width: 900px) {
      display: none;
   }
`;

export const InfoWrapper = styled.div`
   flex-grow: 1;
   flex-shrink: 2;
   padding: min(5%, 70px);
   display: flex;
   flex-flow: column nowrap;
   align-items: flex-start;
   > * {
      padding-top: 20px;
   }
`;



export const Title = styled.h2`
   font-size: max(3vw, 30px);

   text-align: center;
`;

export const GenresWrapper = styled.div`
   display: flex;
   flex-flow: row wrap;
`;

export const GenreItem = styled.h4`
   margin: 5px;
   border-radius: 5px;
   padding: 10px;
   background-color: ${Global.color.primaryDark};

`;

export const DescriptionVoteWrapper = styled.div`
   width: 100%;
   display: flex;
   flex-flow: row nowrap;
   justify-content: space-around;
   align-items: center;
   @media (max-width: 500px) {
      flex-flow: column;
      justify-content: space-around;
      align-items: space-around;
   }
`;

export const Description = styled.p`
   padding: 30px;
   font-size: 14px;
   line-height: 1.2
`;

export const VoteWrapper = styled.div`
   flex-shrink: 0;
   flex-basis: 80px !important;

   > h5 {
      margin-top: 10px;
      font-size: 12px;
      text-align: center;
   }
`;

export const VoteProgressBar = styled(CircularProgressbar)`
   height: 50px;
`;
