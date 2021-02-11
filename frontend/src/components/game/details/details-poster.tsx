import styled from 'styled-components';

interface IDetailsPosterProps {
   bgUrl: string;
}

export const DetailsPoster = (props: IDetailsPosterProps) => {

   return (
      <PosterImage bgUrl={props.bgUrl}>

      </PosterImage>

   );
}

interface IPosterImageProps {
   bgUrl: string;
}
const PosterImage = styled.div`
   flex: 1 1 600px;
   height: 100%;   
   border-radius: 30px 0 0 30px;
   background: url(${(props: IPosterImageProps) => props.bgUrl});
   background-position: center;
   background-size: cover;
   @media only screen and (max-width: 1400px) {
      display: none;
   }
`;