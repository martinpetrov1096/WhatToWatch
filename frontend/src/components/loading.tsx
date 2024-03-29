import styled, { keyframes, css } from 'styled-components';


////////////////////////////////////////////////////
//////////////////// COMPONENT /////////////////////
////////////////////////////////////////////////////

export const Loading = () => {


   return (
      <Wrapper viewBox="25 25 50 50">
         <Circle cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
      </Wrapper>
   );
}
////////////////////////////////////////////////////
//////////////// STYLED COMPONENTS /////////////////
////////////////////////////////////////////////////

const rotateKeyframe = () => keyframes`
   100% {
      transform: rotate(360deg);
   }
`;
const dashKeyframe = () => keyframes`
   0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
   }
   50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35px;
   }
   100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124px;
   }
`;
const Wrapper = styled.svg`
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   margin: auto;
   height: 100%;
   width: 100%;
   max-width: 75px;
   max-height: 75px;
   animation: ${css`${rotateKeyframe()} 2s linear infinite`};
   transform-origin: center center;
`;
const Circle = styled.circle`
   stroke: ${(props: any) => props.colorAccent};
   stroke-dasharray: 89, 200;
   stroke-dashoffset: 10;
   animation: ${css`${dashKeyframe()} 2s linear infinite`};
   stroke-linecap: round;
`;