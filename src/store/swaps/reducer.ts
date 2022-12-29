import { createReducer } from '@reduxjs/toolkit';
import { setLastSwapInfo } from './actions';
import { ISwapsStateData } from './interfaces/data.interface';

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
};

export default createReducer(initialState, (builder) =>
  builder.addCase(setLastSwapInfo, (state, { payload }): ISwapsStateData => {
    return {
      ...state,
      lastSwapInfo: payload,
    };
  }),
);
