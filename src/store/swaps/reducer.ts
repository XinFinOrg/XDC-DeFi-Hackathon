import { createReducer } from '@reduxjs/toolkit';
import { setLastSwapInfo, updateSelectedNetworks } from './actions';
import { ISwapsStateData } from './interfaces/data.interface';
import { initialSelectedNetworks } from '../../constants';

export const initialState: ISwapsStateData = {
  lastSwapInfo: {
    amount: '',
    publicHash: '',
    receiverAddress: '',
    sender: '',
    timestamp: 0,
    token: '',
    secret: '',
  },
  selectedNetworks: initialSelectedNetworks,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(setLastSwapInfo, (state, { payload }): ISwapsStateData => {
      return {
        ...state,
        lastSwapInfo: payload,
      };
    })
    .addCase(updateSelectedNetworks, (state, { payload }): ISwapsStateData => {
      return {
        ...state,
        selectedNetworks: {
          ...state.selectedNetworks,
          ...payload,
        },
      };
    }),
);
