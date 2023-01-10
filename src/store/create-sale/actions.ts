import { createAction } from '@reduxjs/toolkit';
import React from 'react';
import { ICreateSaleData, IERC20DataCreatePresale } from './interfaces/data.interface';

export const setCreateSale = createAction<React.ChangeEvent<HTMLInputElement>>(
  'createSale/setCreateSale',
);

export const setCreateSaleField = createAction<{
  [key in keyof ICreateSaleData]?: ICreateSaleData[key];
}>('createSale/setCreateSaleField');

export const cleanCreateSaleState = createAction<null>('createSale/cleanCreateSaleState');

export const setTokenAddressIsValid = createAction<boolean>('createSale/setTokenAddressIsValid');
export const setERC20DataCreatePresale = createAction<IERC20DataCreatePresale>(
  'createSale/setERC20DataCreatePresale',
);
