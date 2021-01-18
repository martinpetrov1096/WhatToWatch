import styled from 'styled-components';
import * as Global from '../global';


export const Wrapper = styled.div`
   width: 100%; // Don't define height since will be different in overview vs vote
   display: flex;
   flex-flow: column nowrap;
   align-items: center;
`;