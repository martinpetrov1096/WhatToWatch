import styled from 'styled-components';
import * as Global from '../global';

/**
 * Make the BG height auto, and not 100%
 * since later on when we keep adding 
 * options, things might get cluttered
 */
export const BG = styled(Global.PurpleBG)`
   display: flex;
   flex-flow: column nowrap;
   justify-content: flex-start;
   align-items: center;
   height: auto;
`;

export const Title = styled.h1`
   margin: 20px 0;
   font-size: max(5vw, 30px);
`;

export const IDWrapper = styled.div`
   display: flex;
   flex-flow: row nowrap;
`;

export const ID = styled.h2`
   margin: 20px min(10px, 1vw);
   border-radius: 8px;
   padding: 20px;
   background-color: ${Global.color.primaryDark};
   box-shadow: inset 2px 2px 2px #191B30;
`;


export const TypeWrapper = styled.div`
   margin: 20px 0;
   display: flex;
   flex-flow: row nowrap;
   align-items: center;
`;

export const Type = styled.h3`
   margin: 0 10px;
   font-size: 18px;
   text-align: center;
`;

export const MinRatingWrapper = styled.div`
   display: flex;
   flex-flow: row nowrap;
   align-items: center;
`;

export const MinRatingButton = styled(Global.Button)`
   width: 40px;
   height: 40px;
   padding: 0;
   text-align: center;
`;

export const MinRatingInput = styled.input`
   border: none;
   border-radius: 8px;
   box-shadow: inset 2px 2px 2px #191B30;
   outline: none;
   width: 40px;
   height: 40px;
   background-color: ${Global.color.primaryDark};
   text-align: center;
   color: white;
   font: 'Varela', sans-serif;
`;