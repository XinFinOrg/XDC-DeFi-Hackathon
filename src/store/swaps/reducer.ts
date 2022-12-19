import { createReducer } from '@reduxjs/toolkit';
import { setSelectedNetworks } from './actions';
import { ISwapsStateData } from './interfaces/data.interface';

export const initialState: ISwapsStateData = {
  selectedNetworks: {
    from: 50,
    to: 97,
  },
};

export default createReducer(initialState, (builder) =>
  builder.addCase(setSelectedNetworks, (state, { payload }): ISwapsStateData => {
    return {
      ...state,
      selectedNetworks: payload,
    };
  }),
);
