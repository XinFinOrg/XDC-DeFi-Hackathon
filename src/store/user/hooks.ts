import { useSelector } from 'react-redux';
import { ConnectorNames } from '../../utils/web3React';
import { AppState } from '../index';

export const useConfirmedDisclaimer = (address?: string): boolean => {
  return useSelector((state: AppState) =>
    address && state.user.confirmedDisclaimer
      ? state.user.confirmedDisclaimer[address] ?? false
      : false,
  );
};

export const useSelectedWallet = (): ConnectorNames | undefined => {
  return useSelector((state: AppState) => state.user.selectedWallet);
};
