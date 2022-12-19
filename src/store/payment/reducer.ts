import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaymentState } from './types';

const initialState: PaymentState = {
  isXTT: true,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setIsXTT(state, action: PayloadAction<boolean>) {
      state.isXTT = action.payload;
    },
  },
});

export const { setIsXTT } = paymentSlice.actions;

export default paymentSlice.reducer;
