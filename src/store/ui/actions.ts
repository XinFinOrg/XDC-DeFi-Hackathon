import { createAction } from '@reduxjs/toolkit';
import { IModal } from './interfaces/data.interface';

export const openWallet = createAction<IModal>('ui/openWallet');
export const closeWallet = createAction<void>('ui/closeWallet');
export const setTheme = createAction<{ isDark: boolean }>('ui/setTheme');
export const openModal = createAction<IModal>('ui/openModal');
export const closeModal = createAction<void>('ui/closeModal');
