import React from 'react';
import styled from 'styled-components';
import { ISwipe } from '../../../types/swipe';
import { Rating } from '../../../components/game/rating';
import { Genres } from './genres'; 
interface IInitialDetailsProps {
   card: ISwipe | undefined;
   type: 'movie' | 'tv' | undefined;
}

export const InitialDetails = (props: IInitialDetailsProps) => {
   
   return (
      <Wrapper>
         <Title>{props.card?.title}</ Title>
         <Genres genre_ids={props.card?.genre_ids} type={props.type}/>
         <DescriptionRatingWrapper>
            <Rating rating={props.card?.vote_average} subtitle={'Audience Score'}/>
            <Description>{props.card?.overview}</ Description>
         </DescriptionRatingWrapper>
      </Wrapper>
   );
};
///////////////////////////////////////////////////////////////////////////
////////////////////////////////// STYLES /////////////////////////////////
///////////////////////////////////////////////////////////////////////////

const Wrapper = styled.div`
   align-self: center;
   display: flex;
   flex-flow: column nowrap;
   > * {
      margin: 10px 0;
   }
`;

const Title = styled.h2`
   align-self: center;
   font-size: max(4vw, 30px);
   text-align: center;
`;


const DescriptionRatingWrapper = styled.div`
   width: 100%;
   display: flex;
   flex-flow: row wrap;
   align-items: center;
   justify-content: space-between;
`;

const Description = styled.p`
   flex: 1 1 80%;
   padding: 30px 10px;
   font-size: 14px;
   line-height: 1.5;
`;
