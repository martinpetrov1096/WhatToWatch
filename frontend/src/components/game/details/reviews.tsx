import styled from 'styled-components';
import { Rating } from '../../game/rating';
interface IReviewProps {
   reviews: Array<any>;
}

export const Reviews = (props: IReviewProps) => {

   if (props.reviews.length === 0) {
      return (
         <ReviewsWrapper>
            <Title>Reviews</Title>
            <ReviewTitle>There aren't any reviews for this movie</ReviewTitle>
         </ReviewsWrapper>
      );
   }

   return (
      <ReviewsWrapper>
         {props.reviews.map((r: any) => (
            <Review key={r.id}>
               <HeadingWrapper>
                  <ReviewTitle>A review by <a href={r.url} rel="noreferrer noopener" target="_blank">{r.author}</a></ReviewTitle>
                  {r.author_details.rating ? <Rating rating={r.author_details.rating} subtitle={''}/> :  null}
               </HeadingWrapper>
               <Description>{r.content}</Description>
            </Review>
         ))}
      </ReviewsWrapper>
   );
}
///////////////////////////////////////////////////////////////////////////
////////////////////////////////// STYLES /////////////////////////////////
///////////////////////////////////////////////////////////////////////////

const ReviewsWrapper = styled.div`
   align-self: center;
   width: 100%;
   color: rgb(220, 225, 230);
   display: flex;
   flex-flow: column wrap;
   justify-content: center;
`;
const Title = styled.h2`
   align-self: flex-start;
   font-size: 50px;
`;
const Review = styled.div`
   align-self: stretch;
   margin: 50px 0;
   border-radius: 10px;
   padding: min(7%, 50px);
   max-width: 1000px;
   max-height: 300px;
   background-color: ${(props: any) => props.theme.colorPrimary};
   box-shadow: ${(props: any) => props.theme.boxShadowSmall};
   display: flex;
   flex-flow: column nowrap;
   justify-content: flex-start;
`;
const HeadingWrapper = styled.div`
   width: 100%;
   display: flex;
   flex-flow: row wrap;
   align-items: center;
   justify-content: flex-start;
`;
const ReviewTitle = styled.h3`
   margin-bottom: 10px;
   font-size: 30px;
   word-break: break-word;
   > a {
      color: inherit;
   }
`;
const Description = styled.p`
   font-size: 15px;
   line-height: 1.5;
   word-break: break-word;
   overflow: hidden;
`;