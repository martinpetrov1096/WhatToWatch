import styled from 'styled-components';

export const Button = styled.button`
   transition: ${(props: any) => props.theme.transition};
   padding: 10px;
   background-color: white;
   box-shadow: ${(props: any) => props.theme.boxShadowSmall};
   outline: none;
   border: none !important;
   border-radius: 5px;
   color: black;
   font-size: 22px;
   margin: 15px;

`;

export const ButtonAccent = styled(Button)`
   color: white;
   background-color: ${(props: any) => props.theme.colorAccent};
`;

export const PurpleBG = styled.div`
   margin: 0;
   padding: 10px;
`;