import { createReducer } from '@reduxjs/toolkit';
import {
  cleanCreateSaleState,
  setCreateSale,
  setCreateSaleField,
  setERC20DataCreatePresale,
  setTokenAddressIsValid,
} from './actions';
import { ICreateSaleData } from './interfaces/data.interface';

export const initialState: ICreateSaleData = {
  tokenAddress: '',
  tokenAddressIsValid: false,
  presaleRate: '',
  softCap: '',
  hardCap: '',
  minContributionLimits: '',
  maxContributionLimits: '',
  dexLiquidity: 51,
  dexListingRate: '',
  logo: '',
  website: '',
  github: '',
  twitter: '',
  reddit: '',
  telegram: '',
  discord: '',
  linkAudit: '',
  description: '',
  presaleStart: '',
  presaleEnd: '',
  liquidityLockupTime: '',
  tokenData: {
    symbol: '',
    name: '',
    decimals: 18,
    balance: '0',
    allowance: '0',
    totalSupply: '0',
  },
};

export default createReducer<ICreateSaleData>(initialState, (builder) =>
  builder
    .addCase(setCreateSale, (state, { payload }): ICreateSaleData => {
      return {
        ...state,
        [payload.target.name]: payload.target.value,
      };
    })
    .addCase(setCreateSaleField, (state, { payload }): ICreateSaleData => {
      return {
        ...state,
        ...payload,
      };
    })
    .addCase(cleanCreateSaleState, (state): ICreateSaleData => {
      return {
        ...state,
        ...initialState,
      };
    })
    .addCase(
      setTokenAddressIsValid,
      (state, { payload }): ICreateSaleData => ({
        ...state,
        tokenAddressIsValid: payload,
      }),
    )
    .addCase(setERC20DataCreatePresale, (state, { payload }): ICreateSaleData => {
      return {
        ...state,
        tokenData: payload,
      };
    }),
);
