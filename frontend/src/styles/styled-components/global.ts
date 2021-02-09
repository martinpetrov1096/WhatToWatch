import styled from 'styled-components';

export const Button = styled.button`
   margin: 15px;
   border-radius: 10px;
   padding: 15px;

   transition: ${(props: any) => props.theme.transition};
   background-color: transparent;
   box-shadow: ${(props: any) => props.theme.boxShadowSmall};
   outline: none;
   border: none !important;

   color: white;
   font-size: 22px;


`;

export const ButtonAccent = styled(Button)`
   color: white;
   background-color: ${(props: any) => props.theme.colorAccent};
`;

export const PurpleBG = styled.div`
   margin: 0;
   padding: 10px;
`;