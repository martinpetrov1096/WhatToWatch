import styled from 'styled-components';
import * as Global from '../../global';

export const Wrapper = styled.div`
   margin-bottom: 30px;
   display: flex;
   flex-flow: column nowrap;
   align-items: center;
`;

export const Header = styled.h3`
   font-size: 30px;
`;

export const SelectionWrapper = styled.div`
   display: flex;
   flex-flow: row nowrap;
   align-items: center;
`;

export const Button = styled(Global.Button)`
   width: 40px;
   height: 40px;
   padding: 0;
   text-align: center;
`;

export const Input = styled.input`
   border: none;
   border-radius: 8px;
   box-shadow: inset 2px 2px 2px #191B30;
   outline: none;
   width: 40px;
   height: 40px;
   background-color: ${Global.color.primaryDark};
   text-align: center;
   color: white;
   font-family: 'Varela', sans-serif;
   
   ::-webkit-outer-spin-button,
   ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
   }
   -moz-appearance: textfield // Firefox
`;