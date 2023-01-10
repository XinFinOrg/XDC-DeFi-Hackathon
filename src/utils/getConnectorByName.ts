import { injected, walletconnect } from '../constants/connectors';
import { ConnectorNames } from './web3React';

export default function getConnectorByName(name: ConnectorNames) {
  switch (name) {
    case ConnectorNames.Injected:
      return injected;
    case ConnectorNames.WalletConnect:
      return walletconnect;
  }
}
