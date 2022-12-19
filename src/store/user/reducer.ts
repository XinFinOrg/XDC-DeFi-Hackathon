import { createSlice } from '@reduxjs/toolkit';
import { ConnectorNames } from '../../utils/web3React';

export interface UserState {
  selectedWallet?: ConnectorNames;
  confirmedDisclaimer: { [presaleAddress: string]: boolean };
}

export const initialState: UserState = {
  selectedWallet: undefined,
  confirmedDisclaimer: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateSelectedWallet(state, { payload: { wallet } }) {
      state.selectedWallet = wallet;
    },
    updateConfirmedDisclaimer(state, { payload: { presaleAddress } }) {
      state.confirmedDisclaimer = { ...state.confirmedDisclaimer, [presaleAddress]: true };
    },
  },
});

export const { updateSelectedWallet, updateConfirmedDisclaimer } = userSlice.actions;
export default userSlice.reducer;
