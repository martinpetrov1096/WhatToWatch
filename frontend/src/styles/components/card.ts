import styled from 'styled-components';
import * as Global from '../global';

type CardStyleProps = {
   posterUrl: string;
}

export const Main = styled.div`
   padding-bottom: min(100%, 60vh);
   border-radius: 5%;
   width: 66.6%;
   max-width: 450px;

   background-image: url("${ (props: CardStyleProps) => props.posterUrl }");
   background-position: center;
   background-size: cover;
   box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);

   transition: all 1s ease-in-out;
`;