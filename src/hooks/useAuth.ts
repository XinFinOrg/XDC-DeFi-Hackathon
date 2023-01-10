import { AbstractConnector } from '@web3-react/abstract-connector';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { NoEthereumProviderError } from '@web3-react/injected-connector';
import {
  UserRejectedRequestError,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { connectorLocalStorageKey } from '../constants';
import { setupNetwork } from '../utils/wallet';
import { ConnectorNames, walletsByName } from '../utils/web3React';

const useAuth = () => {
  const { activate, deactivate, chainId } = useWeb3React();

  const login = useCallback(
    (connectorID: ConnectorNames) => {
      let connector: AbstractConnector | null | undefined;
      try {
        // eslint-disable-next-line prefer-destructuring
        connector = walletsByName[connectorID].connector;
      } catch (e) {
        connector = null;
        if (e instanceof TypeError) {
          window.localStorage.removeItem(connectorLocalStorageKey);
        }
      }
      if (connector) {
        try {
          activate(connector, () => null, true).then(
            () => {
              window.localStorage.setItem(connectorLocalStorageKey, JSON.stringify(connectorID));
            },
            async (error) => {
              if (error instanceof UnsupportedChainIdError) {
                const hasSetup = await setupNetwork(chainId);
                if (hasSetup) {
                  activate(connector as AbstractConnector);
                }
              } else {
                window.localStorage.removeItem(connectorLocalStorageKey);
                if (error instanceof NoEthereumProviderError) {
                  toast('Sorry there is no provider');
                }
              }
              if (error instanceof UserRejectedRequestError) {
                if (connector instanceof WalletConnectConnector) {
                  connector.walletConnectProvider = undefined;
                }
                deactivate();
              }
              console.info(error);
            },
          );
        } catch (e) {
          deactivate();
          console.info(e);
        }
      } else {
        console.error('Fucked up');
      }
    },
    [activate, deactivate],
  );

  const logout = useCallback(() => {
    deactivate();

    if (window.localStorage.getItem('walletconnect')) {
      // @ts-ignore
      walletsByName.walletconnect.connector.close();
      // @ts-ignore
      walletsByName.walletconnect.connector.walletConnectProvider = null;
    }
    window.localStorage.removeItem(connectorLocalStorageKey);
  }, [deactivate]);

  return { login, logout };
};

export default useAuth;
