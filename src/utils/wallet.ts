import { AbstractConnector } from '@web3-react/abstract-connector';
import { CHAIN_INFO } from '../constants/chains';
import { ChainId } from '../interfaces/connection-config.interface';
import { addNetwork } from './addNetwork';
import { getLibrary } from './web3React';

export const setupNetwork = async (chainIdParam?: ChainId) => {
  const provider = window.ethereum;
  const chainId = chainIdParam ?? ChainId.XDC_TEST;
  if (provider && provider.request) {
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
          },
        ],
      });
      return true;
    } catch (e: any) {
      if (e.code === 4902) {
        try {
          const info = CHAIN_INFO[chainId];
          await addNetwork({ library: getLibrary(provider), chainId, info });
          return true;
        } catch (addError) {
          console.error('Failed to setup the network in Metamask', e);
          return false;
        }
      }
      console.error('Failed to setup the network in Metamask', e);
      return false;
    }
  } else {
    console.error("Can't setup the network on metamask because window.ethereum is undefined");
    return false;
  }
};

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @param image
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (
  tokenAddress: string,
  tokenSymbol: string,
  tokenDecimals: number,
  image: string,
) => {
  let tokenAdded;
  if (window.ethereum) {
    tokenAdded = await window.ethereum.request?.({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image,
        },
      },
    });
  }
  return tokenAdded;
};

export const trySwitchingNetwork = async (
  connector: AbstractConnector,
  activate: (connector: AbstractConnector) => Promise<void>,
  chainId?: ChainId,
) => {
  const hasSetup = await setupNetwork(chainId);
  if (hasSetup) {
    console.info('Switched network');
    activate(connector as AbstractConnector);
    return true;
  }

  return false;
};
