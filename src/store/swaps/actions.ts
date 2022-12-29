import { createAction } from '@reduxjs/toolkit';
import { ILastSwapInfo, ISelectedNetworks } from './interfaces/data.interface';

export const setLastSwapInfo = createAction<ILastSwapInfo>('swaps/setLastSwapInfo');
export const updateSelectedNetworks = createAction<Partial<ISelectedNetworks>>(
  'swap/updateSelectedNetworks',
);
