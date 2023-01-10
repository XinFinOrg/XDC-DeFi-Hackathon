import { createReducer } from '@reduxjs/toolkit';
import { Status } from '../../interfaces/statuses';
import { initialCommonState } from '../interfaces/common-state.interface';
import { closeModal, closeWallet, openModal, openWallet, setTheme } from './actions';
import { IUIState } from './interfaces/data.interface';

export const initialState: IUIState = {
  ...initialCommonState,
  isDark: true,
  wallet: {
    data: null,
    open: false,
  },
  modal: {
    data: null,
    open: false,
  },
};

export default createReducer<IUIState>(initialState, (builder) =>
  builder
    .addCase(
      openWallet,
      (state, { payload }): IUIState => ({
        ...state,
        wallet: payload,
      }),
    )
    .addCase(closeWallet, (state) => ({
      ...state,
      wallet: {
        ...state.wallet,
        open: false,
      },
    }))
    .addCase(setTheme, (state, { payload }) => {
      localStorage.setItem('isDark', JSON.stringify(payload.isDark));
      return {
        ...state,
        status: Status.SUCCESS,
        isDark: payload.isDark,
      };
    })
    .addCase(
      openModal,
      (state, { payload }): IUIState => ({
        ...state,
        modal: payload,
      }),
    )
    .addCase(closeModal, (state) => ({
      ...state,
      modal: {
        ...state.modal,
        open: false,
      },
    })),
);
