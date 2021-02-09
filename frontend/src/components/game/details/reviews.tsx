import styled from 'styled-components';
import { Rating } from '../../game/rating';
interface IReviewProps {
   reviews: Array<any>;
}

export const Reviews = (props: IReviewProps) => {

   return (
      <ReviewsWrapper>
         <Title>Reviews</Title>
            {props.reviews.map((r: any) => (
               <Review key={r.id}>
                  <HeadingWrapper>
                     <ReviewTitle>A Review by {r.author}</ReviewTitle>
                     <Rating rating={r.author_details.rating} subtitle={''}/>
                     
                  </HeadingWrapper>
                  <Description cite={r.url}>{r.content}</Description>
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
   flex-basis: 100%;
   font-size: 50px;
`;


const Review = styled.div`
   align-self: center;
   max-width: 1000px;

   margin: 30px 0;
   border-radius: 10px;
   padding: 30px;
   background-color: ${(props: any) => props.theme.colorPrimaryDark};

   display: flex;
   flex-flow: column nowrap;
   justify-content: space-around;

   @media only screen and (min-width: 900px) {
      margin: 30px 30px;
   }
`;

const HeadingWrapper = styled.div`
   display: flex;
   flex-flow: row wrap;
   align-items: center;
   justify-content: flex-start;

`;

const ReviewTitle = styled.h3`
   font-size: 30px;
   margin-right: 20px;
`;


const Description = styled.blockquote`
   max-height: 250px;
   font-size: 14px;
   line-height: 1.5;
   overflow: hidden;
   word-wrap: break-word;
   text-overflow: ellipsis;
`;