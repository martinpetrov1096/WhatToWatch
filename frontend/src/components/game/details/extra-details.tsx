import axios, { AxiosResponse } from 'axios';
import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import config from '../../../config/config.json';
import { Loading } from '../../loading';
import { Cast } from './cast';
import { Reviews } from './reviews';
interface IExtraDetailsProp {
   cardId: string;
   type: 'movie' | 'tv' | undefined;
}

export const ExtraDetails = (props: IExtraDetailsProp) => {

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

   if (details) {
      return (
         <Wrapper>
            <Cast cast={cast}/>
            <Reviews reviews={reviews}/>
         </Wrapper>
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