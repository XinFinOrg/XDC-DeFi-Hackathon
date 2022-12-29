export interface ISwapsStateData {
  lastSwapInfo: ILastSwapInfo;
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
