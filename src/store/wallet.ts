import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const currentWalletSlice = createSlice({
  name: 'wallet',
  initialState: {
    wallet: ''
  },
  reducers: {
    setWallet(state, action: PayloadAction<string>) {
      state.wallet = action.payload;
    }
  }
});

export const { setWallet } = currentWalletSlice.actions;
export default currentWalletSlice.reducer;