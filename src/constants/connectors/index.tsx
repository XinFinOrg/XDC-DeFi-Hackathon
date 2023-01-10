import { SafeAppConnector } from '@gnosis.pm/safe-apps-web3-react';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { ChainId } from '../../interfaces/connection-config.interface';
import { ALL_SUPPORTED_CHAIN_IDS, CHAIN_INFO } from '../chains';
import { NetworkConnector } from './NetworkConnector';

export const NETWORK_URLS: { [key in ChainId]: string } = {
  [ChainId.XDC_PROD]: CHAIN_INFO[ChainId.XDC_PROD].rpcUrls[1],
  [ChainId.XDC_TEST]: CHAIN_INFO[ChainId.XDC_TEST].rpcUrls[1],
  [ChainId.BSC_TEST]: CHAIN_INFO[ChainId.BSC_TEST].rpcUrls[1],
  [ChainId.BSC_PROD]: CHAIN_INFO[ChainId.BSC_PROD].rpcUrls[1],
  [ChainId.POLYGON_TEST]: CHAIN_INFO[ChainId.POLYGON_TEST].rpcUrls[1],
};

export const network = new NetworkConnector({
  urls: NETWORK_URLS,
  defaultChainId: ChainId.XDC_PROD,
});

export const injected = new InjectedConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
});

export const gnosisSafe = new SafeAppConnector();

export const walletconnect = new WalletConnectConnector({
  supportedChainIds: [ChainId.XDC_PROD],
  rpc: {
    [ChainId.XDC_PROD]: CHAIN_INFO[ChainId.XDC_PROD].rpcUrls[1],
  },
  qrcode: true,
  infuraId: undefined,
  chainId: ChainId.XDC_PROD,
});

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: CHAIN_INFO[ChainId.XDC_PROD].rpcUrls[1],
  appName: 'AtomX',
});
