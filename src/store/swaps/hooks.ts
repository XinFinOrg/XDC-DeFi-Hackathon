import { useSelector } from 'react-redux';
import { AppState } from '..';
import { ILastSwapInfo, ISelectedNetworks, SwapType } from './interfaces/data.interface';
import { ChainId } from '../../interfaces/connection-config.interface';

export const useLastSwapInfo = (): ILastSwapInfo => {
  return useSelector((state: AppState) => state.swaps.lastSwapInfo);
};

export const useSelectedNetwork = (type: SwapType): ChainId => {
  return useSelector((state: AppState) => state.swaps.selectedNetworks[type]);
};

export const useSelectedNetworks = (): ISelectedNetworks => {
  return useSelector((state: AppState) => state.swaps.selectedNetworks);
};
