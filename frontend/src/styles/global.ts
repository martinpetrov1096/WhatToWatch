import styled, { css } from 'styled-components';

export const color = {
   primary: '#3B406B',
   primaryDark: '#2B2F54',
   secondary: '#FF616F'
}
export const transition = 'all .2s ease-in';

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

   margin: 0;
   padding: 10px;
`;