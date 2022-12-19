import { useSelector } from 'react-redux';
import { AppState } from '../index';

export const useIsXTT = () => {
  return useSelector((state: AppState) => state.payment.isXTT);
};
