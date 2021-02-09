import axios from 'axios';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components';
import config from '../../config/config.json';
import { Wrapper, Title, Description } from '../../styles/styled-components/lobby';
interface IProviderParam {
   socket: Socket;
   selectedProviders: number[]
}

export const LobbyProviders = (props: IProviderParam) => {

   const addProvider = useCallback((genreId: number) => {
      props.socket.emit('addProvider', genreId);
      console.log('adding provider');
   }, [props.socket]);

   const delProvider = useCallback((genreId: number) => {
      props.socket.emit('delProvider', genreId);
      console.log('deleting provider');
   }, [props.socket]);

   const [providers, setProviders] = useState<any>();

   useEffect(() => {
      axios.get(config.server.apiUrl + '/info/providers')
         .then((res) => {
            setProviders(res.data);
         })
         .catch((err) => {
            console.error('Could not get providers from server');
         })
   }, []);

   const providerElements = useMemo(() => {
      if (!providers) {
         return null;
      }
      return providers.map((p: any) => (
         <ProviderWrapper key={p.id}>
            <Provider 
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
   height: 70px;
   display: flex;
   flex-flow: row wrap;
   justify-content: space-around;
   align-items: center;
`;

const ProviderWrapper = styled.div`
   display: flex;
   flex-flow: column nowrap;
`;

const Provider = styled.input.attrs({
   type: 'checkbox',
   name: 'provider'
})`
   display: none;
   :checked + label {
      border: ${(props: any) => props.theme.colorAccent} 3px solid;
      box-shadow: 3px 3px 5px ${(props: any) => props.theme.colorAccent},
                  -3px -3px 5px ${(props: any) => props.theme.colorAccent};;
   }
`;

interface ProviderLabelProps {
   iconUrl: string;
}

const ProviderLabel = styled.label`
   border-radius: 5px;
   width: 50px;
   height: 50px;
   background-image: url(${(props: ProviderLabelProps) => props.iconUrl});
   background-position: center;
   background-size: cover;
`;