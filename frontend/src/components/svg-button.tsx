////////////////////////////////////////////////////
//////////////////// COMPONENT /////////////////////
////////////////////////////////////////////////////


import styled from "styled-components";

export default function SVGButton(props: IButtonProp) {


   return (
      <Wrapper onClick={props.onClick} className={props.className}>
         <SVG width={props.width} height={props.height} viewBox={props.viewBox} fill="none" >
            {props.children}
         </SVG>
      </Wrapper>
   );
}
////////////////////////////////////////////////////
/////////////// COMPONENT PROP TYPES ///////////////
////////////////////////////////////////////////////

interface IButtonProp {
   children?: any;
   width: string;
   height: string;
   viewBox: string;
   className?: any;
   onClick: () => void;
}
////////////////////////////////////////////////////
//////////////// STYLED COMPONENTS /////////////////
////////////////////////////////////////////////////

const Wrapper = styled.button`
   box-shadow: none;
   border: none;
   border-radius: 100%;
   background-color: transparent;
   cursor: pointer;
   :focus {
      outline: none;
   }
`;
const SVG = styled.svg`
   > .stroke {
      transition: ${(props: any) => props.theme.transition};
      stroke: white;
   }
   > .fill {
      transition: ${(props: any) => props.theme.transition};
      fill: white;
   }
   :hover {
      > .stroke {
         stroke: ${(props: any) => props.theme.colorAccent};
      }
      > .fill {
         fill: ${(props: any) => props.theme.colorAccent};
      }
   }

`;