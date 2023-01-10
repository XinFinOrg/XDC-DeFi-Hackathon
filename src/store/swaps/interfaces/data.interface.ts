import { ChainId } from '../../../interfaces/connection-config.interface';

export enum SwapType {
  initiator = 'initiator',
  replier = 'replier',
}

export type ISelectedNetworks = {
  [key in SwapType]: ChainId;
};

export interface ISwapsStateData {
  lastSwapInfo: ILastSwapInfo;
  selectedNetworks: ISelectedNetworks;
}

export interface ILastSwapInfo {
  amount: string;
  publicHash: string;
  receiverAddress: string;
  sender: string;
  timestamp: number;
  token: string;
  secret: string;
}
