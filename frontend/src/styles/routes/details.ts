import styled from 'styled-components';
import * as Global from '../global';


export type DetailsStyleProps = {
   bgUrl: string;
}

export const Wrapper = styled.div`
   
   background-image: linear-gradient(rgba(59, 64, 107, .2), rgba(59, 64, 107, .9)), url('${(props: DetailsStyleProps) => props.bgUrl}');
   background-repeat: no-repeat;
   background-position: center;
   background-size: cover;
   height: 100%;
`;

export const BackButton = styled(Global.Button)`
   position: absolute;
   top: 0;
   left: 0;
`;

export const Blur = styled.div`
   width: 100%;
   height: 100%;
   backdrop-filter: blur(8px);

   display: flex;
   flex-flow: column nowrap;
   align-items: center;
`;

export const Card = styled.div`
   margin: 300px 0;
   box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
   
   border-radius: 30px;
   width: min(1500px, 95%);
   min-height: 1000px;
   
   background-color: ${Global.color.primary};

   display: flex;
   flex-flow: row nowrap;
   justify-content: stretch;

`;

type DetailsPosterImageProps = {
   posterUrl: string;
}

export const PosterImage = styled.div`
   flex-basis: 35%;

   border-radius: 30px 0 0 30px;
   background-image: url("${ (props: DetailsPosterImageProps) => props.posterUrl }") ;
   background-position: center;
   background-size: cover;

   @media only screen and (max-width: 900px) {
      display: none;

   }
`;

export const InfoWrapper = styled.div`
   flex-basis: 65%;

   padding: 70px;
   display: flex;
   flex-flow: column nowrap;
   align-items: center;
`;



export const Title = styled.h2`
   font-size: max(3vw, 35px);
   text-align: center;
`;

export const Description = styled.p`

`;

