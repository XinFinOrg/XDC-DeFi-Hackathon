import { useSelector } from 'react-redux';
import { AppState } from '..';
import { ILastSwapInfo } from './interfaces/data.interface';

export const useLastSwapInfo = (): ILastSwapInfo => {
  return useSelector((state: AppState) => state.swaps.lastSwapInfo);
};
