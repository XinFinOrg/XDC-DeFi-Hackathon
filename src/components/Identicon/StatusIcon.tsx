import { AbstractConnector } from '@web3-react/abstract-connector';
import metamaskIcon from '../../assets/metamask.png';
import WalletConnectIcon from '../../assets/walletConnectIcon.svg';
import { injected, walletconnect } from '../../constants/connectors';

export default function StatusIcon({ connector }: { connector: AbstractConnector }) {
  switch (connector) {
    case injected:
      return <img src={metamaskIcon} alt={'Metamask'} />; //<Identicon />;
    case walletconnect:
      return <img src={WalletConnectIcon} alt={'WalletConnect'} />;
    default:
      return null;
  }
}
