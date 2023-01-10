import { createAction } from '@reduxjs/toolkit';
import { CallbackInfo } from './reducer';

export interface SerializableTransactionReceipt {
  to: string;
  from: string;
  contractAddress: string;
  transactionIndex: number;
  blockHash: string;
  transactionHash: string;
  blockNumber: number;
  status?: number;
}

/**
 * Be careful adding to this enum, always assign a unique value (typescript will not prevent duplicate values).
 * These values is persisted in state and if you change the value it will cause errors
 */
export enum TransactionType {
  APPROVAL = 0,
  GENERATE = 1,
  LOCK = 2,
  RELEASE = 3,
  CLAIM = 4,
  SEND = 5,
  CREATE_LOCK = 6,
  CREATE_PRESALE = 7,
  FINALIZE_PRESALE = 8,
  DEPOSIT_TOKENS = 9,
  UNLOCK_TOKENS = 10,
  UPDATE_LOCKER = 11,
  UPDATE_UNLOCK_TIME = 12,
  MINT_XTT = 13,
  VESTING = 14,
  UNLOCK_LIQUIDITY = 15,
  REFUND = 16,
  CREATE_SWAP = 17,
  REDEEM = 18,
}

export interface BaseTransactionInfo {
  type: TransactionType;
}

export interface ApproveTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.APPROVAL;
  tokenAddress: string;
  tokenSymbol?: string;
  spender: string;
}

export interface GenerateTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.GENERATE;
  name: string;
}

export interface SendTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.SEND;
  contractAddress: string;
}
export interface CreatePresaleInfo extends BaseTransactionInfo {
  type: TransactionType.CREATE_PRESALE;
  tokenSymbol: string;
}

export interface CreateSwapInfo extends BaseTransactionInfo {
  type: TransactionType.CREATE_SWAP;
  tokenSymbol: string;
  amount: string;
}

export interface CreateLockTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.CREATE_LOCK;
  name: string;
}

export interface FinalizePresaleInfo extends BaseTransactionInfo {
  type: TransactionType.FINALIZE_PRESALE;
  tokenSymbol: string;
}

export interface DepositTokensInfo extends BaseTransactionInfo {
  type: TransactionType.DEPOSIT_TOKENS;
  tokenSymbol: string;
}
export interface UnlockTokensInfo extends BaseTransactionInfo {
  type: TransactionType.UNLOCK_TOKENS;
  lockerAddress: string;
}

export interface UpdateLockerInfo extends BaseTransactionInfo {
  type: TransactionType.UPDATE_LOCKER;
  newUnlockerAddress: string;
}

export interface UpdateUnlockTimeInfo extends BaseTransactionInfo {
  type: TransactionType.UPDATE_UNLOCK_TIME;
  lockerAddress: string;
}

export interface MintXttInfo extends BaseTransactionInfo {
  type: TransactionType.MINT_XTT;
}

export enum VestingActionType {
  ENABLE,
  DISABLE,
  SAVE,
}

export interface VestingInfo extends BaseTransactionInfo {
  type: TransactionType.VESTING;
  actionType: VestingActionType;
  tokenSymbol: string;
}

export interface UnclockLiquidityInfo extends BaseTransactionInfo {
  type: TransactionType.UNLOCK_LIQUIDITY;
  tokenSymbol: string;
}

export interface ClaimTransactionInfo {
  type: TransactionType.CLAIM;
  recipient: string;
  uniAmountRaw?: string;
}

export interface RefundTransactionInfo {
  type: TransactionType.REFUND;
  amount: string;
}

export interface RedeemTransactionInfo {
  type: TransactionType.REDEEM;
  amount: string;
}

export type TransactionInfo =
  | ApproveTransactionInfo
  | ClaimTransactionInfo
  | GenerateTransactionInfo
  | SendTransactionInfo
  | CreatePresaleInfo
  | CreateSwapInfo
  | CreateLockTransactionInfo
  | FinalizePresaleInfo
  | DepositTokensInfo
  | UnlockTokensInfo
  | UpdateLockerInfo
  | UpdateUnlockTimeInfo
  | MintXttInfo
  | VestingInfo
  | UnclockLiquidityInfo
  | RefundTransactionInfo
  | RedeemTransactionInfo;

export const addTransaction = createAction<{
  chainId: number;
  hash: string;
  from: string;
  info: TransactionInfo;
}>('transactions/addTransaction');

export const clearAllTransactions = createAction<{ chainId: number }>(
  'transactions/clearAllTransactions',
);

export const finalizeTransaction = createAction<{
  chainId: number;
  hash: string;
  receipt: SerializableTransactionReceipt;
}>('transactions/finalizeTransaction');

export const checkedTransaction = createAction<{
  chainId: number;
  hash: string;
  blockNumber: number;
}>('transactions/checkedTransaction');

export const updateVersion = createAction<void>('global/updateVersion');

export const addCallbackInfo = createAction<CallbackInfo>('global/addCallbackInfo');
export const markDoneCallbackInfos = createAction<string[]>('global/markDoneCallbackInfos');
