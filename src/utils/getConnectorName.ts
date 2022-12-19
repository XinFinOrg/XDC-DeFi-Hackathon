import { AbstractConnector } from '@web3-react/abstract-connector';
import { injected, walletconnect } from '../constants/connectors';
import { ConnectorNames } from './web3React';

export default function getConnectionName(connector: AbstractConnector) {
  switch (connector) {
    case injected:
      return ConnectorNames.Injected;
    case walletconnect:
      return ConnectorNames.WalletConnect;
    default:
      return null;
  }
}
