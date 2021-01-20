import styled from 'styled-components';
import * as Global from '../../global';

export const Wrapper = styled.div`
   align-self: center;
   width: 95%;

   display: flex;
   flex-flow: column nowrap;
   justify-content: center;

   > div {
      padding: 30px 0;
   }
`;

export const CastWrapper = styled.div`
   flex-basis: 100%;
   flex-grow: 1;
   height: 275px;
   display: flex;
   flex-flow: column wrap;
   overflow-x: scroll;
`;



export const Cast = styled.div`
   margin: 10px;
   border-radius: 10px;
   width: 138px;
   height: 100%;
   box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
   background-color: ${Global.color.primaryDark};
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

export const ReviewsWrapper = styled.div`
   align-self: center;

   display: flex;
   flex-flow: row wrap;
   justify-content: center;

   > h2 {
      flex-basis: 100%;
      font-size: 50px;
   }

`;

export const Review = styled.div`
   flex: 1 1 500px;
   max-width: 700px;
   margin: 30px 0;
   box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
   border-radius: 10px;
   padding: 40px;
   background-color: ${Global.color.primaryDark};

   > blockquote {
      font-size: 13px;
      max-height: 175px;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.5;
         word-break: break-all;
   }

   > h6 {
   //   padding-top: 5px;
      font-size: 13px;
   }
   @media only screen and (min-width: 900px) {
      margin: 30px 30px;
   }
`;