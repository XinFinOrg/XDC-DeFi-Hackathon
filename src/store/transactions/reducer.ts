import { createReducer } from '@reduxjs/toolkit';
import {
  addCallbackInfo,
  addTransaction,
  checkedTransaction,
  clearAllTransactions,
  finalizeTransaction,
  markDoneCallbackInfos,
  SerializableTransactionReceipt,
  TransactionInfo,
  updateVersion,
} from './actions';

const now = () => new Date().getTime();

export interface TransactionDetails {
  hash: string;
  receipt?: SerializableTransactionReceipt;
  lastCheckedBlockNumber?: number;
  addedTime: number;
  confirmedTime?: number;
  from: string;
  info: TransactionInfo;
}

export interface CallbackInfo {
  func: () => void;
  hash: string;
}

export interface TransactionState {
  [chainId: number]: {
    [txHash: string]: TransactionDetails;
  };
  callbackInfos: CallbackInfo[];
}

export const initialState: TransactionState = {
  callbackInfos: [],
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateVersion, (transactions) => {
      // in case there are any transactions in the store with the old format, remove them
      Object.keys(transactions).forEach((chainId) => {
        const chainTransactions = transactions[chainId as unknown as number];
        Object.keys(chainTransactions).forEach((hash) => {
          if (!('info' in chainTransactions[hash])) {
            // clear old transactions that don't have the right format
            delete chainTransactions[hash];
          }
        });
      });
    })
    .addCase(addTransaction, (transactions, { payload: { chainId, from, hash, info } }) => {
      if (transactions[chainId]?.[hash]) {
        throw Error('Attempted to add existing transaction.');
      }
      const txs = transactions[chainId] ?? {};
      txs[hash] = { hash, info, from, addedTime: now() };
      transactions[chainId] = txs;
    })
    .addCase(clearAllTransactions, (transactions, { payload: { chainId } }) => {
      if (!transactions[chainId]) return;
      transactions[chainId] = {};
      transactions.callbackInfos = [];
    })
    .addCase(checkedTransaction, (transactions, { payload: { chainId, hash, blockNumber } }) => {
      const tx = transactions[chainId]?.[hash];
      if (!tx) {
        return;
      }
      if (!tx.lastCheckedBlockNumber) {
        tx.lastCheckedBlockNumber = blockNumber;
      } else {
        tx.lastCheckedBlockNumber = Math.max(blockNumber, tx.lastCheckedBlockNumber);
      }
    })
    .addCase(finalizeTransaction, (transactions, { payload: { hash, chainId, receipt } }) => {
      const tx = transactions[chainId]?.[hash];
      if (!tx) {
        return;
      }
      tx.receipt = receipt;
      tx.confirmedTime = now();
    })
    .addCase(addCallbackInfo, (state, { payload }) => {
      state.callbackInfos.push(payload);
    })
    .addCase(markDoneCallbackInfos, (state, { payload }) => {
      state.callbackInfos = state.callbackInfos.filter((v) => !payload.includes(v.hash));
    }),
);
