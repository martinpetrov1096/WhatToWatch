import axios, { AxiosResponse } from 'axios';
import { useState, useEffect, useMemo } from 'react';
import config from '../../config/config.json';
import { Loading } from '../loading';
import * as ExtraDetails from '../../styles/components/game/extra-details';
interface IExtraDetailsProp {
   cardId: string;
   type: 'movie' | 'tv' | undefined;
}

export const GameExtraDetails = (props: IExtraDetailsProp) => {



   const [details, setDetails] = useState<any>(undefined);
   useEffect(() => {
      axios.get(config.server.url + config.server.details, {
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
         <ExtraDetails.Wrapper>
            <ExtraDetails.CastWrapper>
               
               {cast.map((c: any) => (
                  <ExtraDetails.Cast>
                     <img src={config.movieDb.profileUrl + c.profile_path} alt={c.name}/>
                     <div>
                        <h3>{c.name}</h3>
                        <h4>{c.character}</h4>
                     </div>
                  </ExtraDetails.Cast>))}
            </ExtraDetails.CastWrapper>
            <ExtraDetails.ReviewsWrapper>
               <h2>Reviews</h2>
                  {reviews.map((r: any) => (
                     <ExtraDetails.Review>
                        <blockquote cite={r.url}>{r.content}</blockquote>
                        <h6>-{r.author}</h6>
                     </ExtraDetails.Review>
                  ))}
            </ExtraDetails.ReviewsWrapper>
         </ExtraDetails.Wrapper>

      );

   } else {
      return <Loading/>;
   }
}