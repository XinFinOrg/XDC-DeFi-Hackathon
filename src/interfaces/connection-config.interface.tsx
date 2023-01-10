import { L1ChainInfo } from '../constants/chains';

export enum ChainId {
  XDC_TEST = 51,
  XDC_PROD = 50,
  BSC_TEST = 97,
  BSC_PROD = 56,
  POLYGON_TEST = 80001,
}

export const enum ENetworkType {
  TEST,
  PROD,
}

export interface IContract {
  address: string;
  abi: any;
}

export interface IConnectionConfig extends L1ChainInfo {
  multicall: IContract;
  atomx: IContract;
}
