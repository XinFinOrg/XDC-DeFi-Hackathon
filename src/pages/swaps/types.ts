import { BigNumber } from 'ethers';
import { BIG_ZERO } from '../../utils/bigNumber';

export enum IInputStatus {
  EMPTY = 'EMPTY',
  INVALID = 'INVALID',
  WARNING = 'WARNING',
  VALID = 'VALID',
}

export interface CreateData {
  token: string;
  amount: string; //number
  timestamp: number;
  receiverAddress: string;
  publicHash: string;
}

export interface CreatedData extends CreateData {
  sender: string;
  secret: string;
}

export interface CreateDataStatus {
  token: IInputStatus;
  amount: IInputStatus; //number
  timestamp: IInputStatus;
  receiverAddress: IInputStatus;
  publicHash: IInputStatus;
}

export interface TokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  balance: BigNumber;
  allowance: BigNumber;
}

export const initialTokenInfo: TokenInfo = {
  name: '',
  symbol: '',
  decimals: 18,
  balance: BIG_ZERO,
  allowance: BIG_ZERO,
};
