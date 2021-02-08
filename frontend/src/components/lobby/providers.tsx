import axios from 'axios';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { Socket } from 'socket.io-client';
import styled from 'styled-components';
import config from '../../config/config.json';
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
         <ProviderWrapper>
            <Provider 
               name={p.name}
               value={p.id}
               checked={props.selectedProviders.includes(p.id)}
               id={p.id}
               onChange={() => props.selectedProviders.includes(p.id) ? delProvider(p.id) : addProvider(p.id)}
            />
            <ProviderLabel htmlFor={p.name}>{p.name}</ProviderLabel>
         </ProviderWrapper>

      ));
   }, [providers, props.selectedProviders, addProvider, delProvider]);

   return (
      <ProvidersWrapper>
         { providerElements }
      </ProvidersWrapper>
   );
}
///////////////////////////////////////////////////////////////////////////
////////////////////////////////// STYLES /////////////////////////////////
///////////////////////////////////////////////////////////////////////////

const ProvidersWrapper = styled.div`
   display: flex;
   flex-flow: row wrap;

`;

const ProviderWrapper = styled.div`
   display: flex;
   flex-flow: column nowrap;
`;

const Provider = styled.input.attrs({
   type: 'radio',
   name: 'provider'
})`

`;

const ProviderLabel = styled.label`

`;