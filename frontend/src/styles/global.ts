import styled, { css } from 'styled-components';

export const color = {
   primary: '#3B406B',
   secondary: '#FF616F'
}
export const transition = 'all .2s ease-in-out';

export const Button = styled.button`
   transition: ${transition};
   padding: 10px;
   background: transparent;
   box-shadow: none;
   outline: none;
   border: 1px solid white;
   border-radius: 10px;
   color: white;
   font-size: 22px;
   margin: 15px;
   &:hover {
      color: ${color.secondary} !important;
      border-color: ${color.secondary} !important;
   }



`;

export const PurpleBG = styled.div`
   background-color: ${color.primary}};
   width: calc(100% - 20px);
   height: calc(100% - 20px);
   margin: 0;
   padding: 10px;
`;