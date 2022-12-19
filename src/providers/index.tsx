import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { NetworkContextName } from '../constants/misc';
import store from '../store';
import { getLibrary } from '../utils/web3React';
import { BlockList } from './BlockList';

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <BlockList>{children}</BlockList>
        </Web3ProviderNetwork>
      </Web3ReactProvider>
    </Provider>
  );
};

export default Providers;
