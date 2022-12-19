import { useSelector } from 'react-redux';
import { Status } from '../../interfaces/statuses';
import { AppState } from '../index';
import { IModal } from './interfaces/data.interface';

export const useWalletModalIsOpen = (): boolean => {
  return useSelector((state: AppState) => state.ui.wallet.open);
};

export const useMultisendDataExample = (): IModal => {
  return useSelector((state: AppState) => state.ui.modal);
};

export const useIsDark = (): boolean => {
  return useSelector((state: AppState) => state.ui.isDark);
};

export const useUIStateStatus = (): Status => {
  return useSelector((state: AppState) => state.ui.status);
};
