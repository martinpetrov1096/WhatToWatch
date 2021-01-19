import styled, { css } from 'styled-components';

export const color = {
   primary: '#3B406B',
   primaryDark: '#2B2F54',
   secondary: '#FF616F'
}
export const transition = 'all .15s ease-in-out';

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

export const ButtonSecondary = styled(Button)`
   pointer-events: none !important;
   border: none !important;
   background-color: ${color.secondary}};
`;


export const PurpleBG = styled.div`


   margin: 0;
   padding: 10px;
`;