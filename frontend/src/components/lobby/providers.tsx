import { useEffect, useState, useMemo, useCallback } from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components';
import { Wrapper, Title, Description } from '../../styles/styled-components/lobby';
import { getProviders, Provider } from '../../utils/get-assets';
interface IProviderParam {
   socket: Socket;
   selectedProviders: number[]
}

export const LobbyProviders = (props: IProviderParam) => {

   const addProvider = useCallback((genreId: number) => {
      if (props.socket) {
         props.socket.emit('addProvider', genreId);
         console.log('adding provider');
      } else {
         console.error('couldn\'t add provider, socket not defined');
      }
   }, [props.socket]);

   const delProvider = useCallback((genreId: number) => {
      if (props.socket) {
         props.socket.emit('delProvider', genreId);
         console.log('deleting provider');
      } else {
         console.error('couldn\'t remove provider, socket not defined');
      }
   }, [props.socket]);

   const [providers, setProviders] = useState<any>();

   useEffect(() => {
      getProviders().then((providers: Provider[]) => {
         setProviders(providers);
      });
   }, []);

   const providerElements = useMemo(() => {
      if (!providers) {
         return null;
      }
      return providers.map((p: any) => (
         <ProviderWrapper key={p.id}>
            <ProviderElement 
               name={p.name}
               value={p.id}
               checked={props.selectedProviders.includes(p.id)}
               id={p.id}
               onChange={() => props.selectedProviders.includes(p.id) ? delProvider(p.id) : addProvider(p.id)}
            />
            <ProviderLabel htmlFor={p.id} iconUrl={p.iconUrl}></ProviderLabel>
         </ProviderWrapper>
      ));
   }, [providers, props.selectedProviders, addProvider, delProvider]);

   return (
      <Wrapper>
         <Title>Streaming Providers</Title>
         <Description>
            Filter results to only show movies/tv shows from
            streaming service providers that you have.
         </Description>
         <ProvidersWrapper>
            { providerElements }
         </ProvidersWrapper>
      </Wrapper>
   );
}
///////////////////////////////////////////////////////////////////////////
////////////////////////////////// STYLES /////////////////////////////////
///////////////////////////////////////////////////////////////////////////

const ProvidersWrapper = styled.div`
   margin-bottom: 40px;
   width: 100%;

   display: flex;
   flex-flow: row wrap;
   justify-content: space-around;
   align-items: center;
`;

const ProviderWrapper = styled.div`
   margin: 10px;

   display: flex;
   flex-flow: column nowrap;
`;

const ProviderElement = styled.input.attrs({
   type: 'checkbox',
   name: 'provider'
})`
   display: none;
   :checked + label {
      /* border: ${(props: any) => props.theme.colorAccent} 3px solid;
      box-shadow: 3px 3px 5px ${(props: any) => props.theme.colorAccent},
                  -3px -3px 5px ${(props: any) => props.theme.colorAccent}; */
      transform: scale(1.2);
      box-shadow: ${(props: any) => props.theme.boxShadowSmall};
  
   }
`;

interface ProviderLabelProps {
   iconUrl: string;
}

const ProviderLabel = styled.label`
   margin: 5px;
   border-radius: 5px;
   height: 60px;
   width: 60px;
   background-image: url(${(props: ProviderLabelProps) => props.iconUrl});
   background-position: center;
   background-size: cover;
   transition: ${(props: any) => props.theme.transition};
`;