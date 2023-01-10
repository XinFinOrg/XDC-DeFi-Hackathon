import { ExternalProvider, JsonRpcFetchFunc } from '@ethersproject/providers/src.ts/web3-provider';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { ethers } from 'ethers';
import metamaskIcon from '../assets/metamask.png';
import walletConnectIcon from '../assets/walletConnectIcon.svg';
import { injected, walletconnect } from '../constants/connectors';

export const enum ConnectorNames {
  Injected = 'injected',
  WalletConnect = 'walletconnect',
}

export const connectorNamesArray = [ConnectorNames.Injected, ConnectorNames.WalletConnect];

const POLLING_INTERVAL = 2000;

export interface ExtendedAbstractConnector extends AbstractConnector {
  close?: () => void;
  walletConnectProvider?: any | null;
}

export interface WalletInfo {
  connector?: ExtendedAbstractConnector;
  name: string;
  iconName: string;
  description: string;
  href: string | null;
  color: string;
  primary?: true;
  mobile?: true;
  mobileOnly?: true;
  iconURL: string;
}

export const walletsByName: { [connectorName in ConnectorNames]: WalletInfo } = {
  [ConnectorNames.Injected]: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.svg',
    iconURL: metamaskIcon,
    description: 'Easy-to-use browser extension.',
    href: null,
    //href: connectionConfig.blockExplorerUrls[0],
    color: '#E8831D',
  },
  [ConnectorNames.WalletConnect]: {
    connector: walletconnect,
    name: 'WalletConnect',
    iconName: 'walletConnect.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true,
    iconURL: walletConnectIcon,
  },
};

export const getLibrary = (
  provider: ExternalProvider | JsonRpcFetchFunc,
): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};
