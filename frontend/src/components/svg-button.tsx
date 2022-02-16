////////////////////////////////////////////////////
//////////////////// COMPONENT /////////////////////
////////////////////////////////////////////////////


import { useMemo } from "react";
import styled from "styled-components";

export default function SVGButton(props: IButtonProp) {


   const svgPath = useMemo(() => {
      switch (props.type) {
         case 'back':
            return (
               <SVG width={props.width} height={props.height} viewBox={props.viewBox} fill="none" >
                  <path d="M53 104.5C81.4427 104.5 104.5 81.4427 104.5 53C104.5 24.5573 81.4427
                     1.5 53 1.5C24.5573 1.5 1.5 24.5573 1.5 53C1.5 81.4427 24.5573 104.5 53 
                     104.5Z" className="stroke" strokeWidth="3" strokeMiterlimit="10"/>
                  <path d="M25.5251 50.5251C24.1583 51.892 24.1583 54.108 25.5251 55.4749L47.799
                     77.7487C49.1658 79.1156 51.3819 79.1156 52.7487 77.7487C54.1156 76.3819 54.1156 
                     74.1658 52.7487 72.799L32.9497 53L52.7487 33.201C54.1156 31.8342 54.1156 29.6181
                     52.7487 28.2513C51.3819 26.8844 49.1658 26.8844 47.799 28.2513L25.5251 
                     50.5251ZM78 49.5L28 49.5V56.5L78 56.5V49.5Z" className="fill"/>
               </SVG>
            );
         case 'like':
            return (
               <SVG width={props.width} height={props.height} viewBox={props.viewBox} fill="none" >
                  <title>heartButton</title>
                  <path className="fill" d="M219.31,80.82c-19-16.18-47.23-13.27-64.66,
                     4.71l-6.83,7-6.82-7c-17.4-18-45.67-20.89-64.66-4.71-21.76,18.57-22.9,
                     51.9-3.43,72L140,222.09a10.86,10.86,0,0,0,15.69,0l67-69.23c19.51-20.14,
                     18.37-53.47-3.39-72Z"/>
                  <circle className="stroke" strokeWidth="10" strokeMiterlimit="10" cx="147.82" cy="147.82" r="142.82"/>
               </SVG>
            );
         case 'dislike': 
            return (
               <SVG width={props.width} height={props.height} viewBox={props.viewBox} fill="none" >
                  <title>rejectButton</title>
                  <path className="fill" d="M174.56,147.52l44.05-44.05a13.85,13.85,0,0,0,
                     0-19.59l-9.79-9.79a13.86,13.86,0,0,0-19.58,0l-44.05,44.06L101.13,74.09a13.86,
                     13.86,0,0,0-19.58,0l-9.79,9.79a13.85,13.85,0,0,0,0,19.59l44.05,44.05-44,44a13.84,
                     13.84,0,0,0,0,19.58l9.79,9.8a13.86,13.86,0,0,0,19.58,0l44.06-44.06L189.24,221a13.86,
                     13.86,0,0,0,19.58,0l9.79-9.8a13.84,13.84,0,0,0,0-19.58Z"/>
                  <circle className="stroke" strokeWidth="10" strokeMiterlimit="10" cx="147.82" cy="147.82" r="142.82"/>
               </SVG>
            );

      }
   }, [props.type, props.height, props.width, props.viewBox]);


   return (
      <Wrapper onClick={props.onClick} className={props.className}>
         {svgPath}
      </Wrapper>
   );
}
////////////////////////////////////////////////////
/////////////// COMPONENT PROP TYPES ///////////////
////////////////////////////////////////////////////

interface IButtonProp {

   type: 'back' | 'like' | 'dislike';
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