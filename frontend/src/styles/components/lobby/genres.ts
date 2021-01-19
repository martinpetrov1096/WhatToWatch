import styled from 'styled-components';
import * as Global from '../../global';

export const Wrapper = styled.div`
   margin-bottom: 30px;

   max-width: 500px;
   height: 100%;
   display: flex;
   flex-flow: row wrap;
   justify-content: center;
   align-content: space-around;
`;

export const Header = styled.h3`
   width: 100%;
   text-align: center;
   font-size: 30px;
`;

export const ItemWrapper = styled.div`
   margin-top: 30px;

   flex-basis: 80px;
   flex-grow: 1;
   white-space: nowrap;
`;

export const Checkbox = styled.input`
   visibility: hidden;
   :checked + label {
      background-color: ${Global.color.primaryDark};
      box-shadow: inset 2px 2px 2px #191B30;
   }
`;

export const Label = styled.label`
   padding: 10px;
   border-radius: 5px;

   font-size: 14px;
   transition: ${Global.transition};

   :hover {
      background-color: ${Global.color.primaryDark};
   }
`;