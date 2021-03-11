import React, { useEffect, useState } from 'react';
import { Provider, getProviders } from '../../../../utils/get-assets';
import styled from 'styled-components';

interface IProviderProps {
   providers: number[] | undefined;
}

export const Providers = (props: IProviderProps) => {

   const [providers, setProviders ] = useState<Provider[]>([]);
   useEffect(() => {
      if (props?.providers === undefined) {
         return;
      }

      getProviders().then((allProviders: Provider[]) => {
         setProviders(allProviders
            .filter((provider: Provider) => {
               if (!props?.providers) {
                  return null;
               }
               return props?.providers?.find((p: any) => p.provider_id === provider.id)
            }));
      });
   }, [props?.providers]);

   return (
      <ProvidersWrapper>
         {providers.map((p) => <ProviderItem key={p.id} src={p.iconUrl} alt={p.name}/>)}
      </ProvidersWrapper>
   );
}

const ProvidersWrapper = styled.div`
   margin: 0;
   padding: 0 !important;
   display: flex;
   flex-flow: row wrap;
`;

const ProviderItem = styled.img`
   margin: 5px;
   border-radius: 5px;
   height: 50px;
   width: 50px;
`;