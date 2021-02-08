import axios, { AxiosResponse } from 'axios';
import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import * as Global from '../../styles/global';
import config from '../../config/config.json';
import { Loading } from '../loading';

interface IExtraDetailsProp {
   cardId: string;
   type: 'movie' | 'tv' | undefined;
}

export const GameExtraDetails = (props: IExtraDetailsProp) => {

   const [details, setDetails] = useState<any>(undefined);

   useEffect(() => {
      axios.get(config.server.apiUrl + 'info/details', {
         params: {
            id: props.cardId,
            type: props.type
         }
      }).then((res: AxiosResponse) => {
         if (res.status === 200) {
            setDetails(res.data);
         }
      });
   }, [props.cardId, props.type]);

   const cast = useMemo(() => {
      if (!details?.credits) {
         return [];
      }
      return details.credits.cast.slice(0,10);
   }, [details]);

   const reviews = useMemo(() => {
      if (!details?.reviews) {
         return [];
      }
      return details.reviews.results.slice(0,10);
   }, [details]);

   if (details !== undefined) {
      return (
         < Wrapper>
            < CastWrapper>
               {cast.map((c: any) => (
                  < Cast key={c.name}>
                     <img src={config.movieDb.profileUrl + c.profile_path} alt={c.name}/>
                     <div>
                        <h3>{c.name}</h3>
                        <h4>{c.character}</h4>
                     </div>
                  </ Cast>))}
            </ CastWrapper>
            < ReviewsWrapper>
               <h2>Reviews</h2>
                  {reviews.map((r: any) => (
                     < Review key={r.id}>
                        <blockquote cite={r.url}>{r.content}</blockquote>
                        <h6>-{r.author}</h6>
                     </ Review>
                  ))}
            </ ReviewsWrapper>
         </ Wrapper>
      );
   } else {
      return <Loading/>;
   }
}
///////////////////////////////////////////////////////////////////////////
////////////////////////////////// STYLES /////////////////////////////////
///////////////////////////////////////////////////////////////////////////

const Wrapper = styled.div`
   align-self: center;
   width: 95%;

   display: flex;
   flex-flow: column nowrap;
   justify-content: center;

   > div {
      padding: 30px 0;
   }
`;

 const CastWrapper = styled.div`
   flex-basis: 100%;
   flex-grow: 1;
   height: 275px;
   display: flex;
   flex-flow: column wrap;
   overflow-x: scroll;
`;



 const Cast = styled.div`
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

 const ReviewsWrapper = styled.div`
   align-self: center;

   display: flex;
   flex-flow: row wrap;
   justify-content: center;

   > h2 {
      flex-basis: 100%;
      font-size: 50px;
   }

`;

 const Review = styled.div`
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