import { createAction } from '@reduxjs/toolkit';
import { ILastSwapInfo } from './interfaces/data.interface';

export const setLastSwapInfo = createAction<ILastSwapInfo>('swaps/setLastSwapInfo');
