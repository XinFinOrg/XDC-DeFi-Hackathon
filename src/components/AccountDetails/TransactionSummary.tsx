// import { useToken } from '../../hooks/Tokens';
import styled from 'styled-components';
import {
  ApproveTransactionInfo,
  ClaimTransactionInfo,
  CreateLockTransactionInfo,
  CreatePresaleInfo,
  CreateSwapInfo,
  DepositTokensInfo,
  FinalizePresaleInfo,
  GenerateTransactionInfo,
  RedeemTransactionInfo,
  RefundTransactionInfo,
  SendTransactionInfo,
  TransactionInfo,
  TransactionType,
  UnclockLiquidityInfo,
  UnlockTokensInfo,
  UpdateLockerInfo,
  UpdateUnlockTimeInfo,
  VestingActionType,
  VestingInfo,
} from '../../store/transactions/actions';
import { shortenAddress } from '../../utils';

function GenerateTransaction({ info: { name } }: { info: GenerateTransactionInfo }) {
  return <span>Generating Contract "{name}" </span>;
}

function CreateLockTransaction({ info: { name } }: { info: CreateLockTransactionInfo }) {
  return <span>Creating lock "{name}" </span>;
}

function ApprovalSummary({ info }: { info: ApproveTransactionInfo }) {
  return <span>Approve {info.tokenSymbol ?? ''}</span>;
}

function SendTransaction({ info }: { info: SendTransactionInfo }) {
  return <span>Sending tokens to: "{info.contractAddress}"</span>;
}

function CreatePresale({ info }: { info: CreatePresaleInfo }) {
  return <span>Creating presale for: {info.tokenSymbol}</span>;
}

function CreateSwap({ info }: { info: CreateSwapInfo }) {
  return (
    <span>
      Creating swap for: {info.tokenSymbol}. ({info.amount})
    </span>
  );
}

function Refund({ info: { amount } }: { info: RefundTransactionInfo }) {
  return <span>Refund "{amount}" </span>;
}

function Redeem({ info: { amount } }: { info: RedeemTransactionInfo }) {
  return <span>Redeem "{amount}" </span>;
}

function FinalizePresale({ info }: { info: FinalizePresaleInfo }) {
  return <span>Finalize presale: {info.tokenSymbol}</span>;
}

function DepositTokens({ info }: { info: DepositTokensInfo }) {
  return <span>Deposit Tokens: {info.tokenSymbol}</span>;
}

function UnlockTokens({ info }: { info: UnlockTokensInfo }) {
  return <span>Unlocked Tokens: {shortenAddress(info.lockerAddress)}</span>;
}

function UpdateLocker({ info }: { info: UpdateLockerInfo }) {
  return <span>Updated unlocker: {shortenAddress(info.newUnlockerAddress)}</span>;
}

function UpdateUnlockTime({ info }: { info: UpdateUnlockTimeInfo }) {
  return <span>Updated lock time: {shortenAddress(info.lockerAddress)}</span>;
}

function ClaimTransaction({ info }: { info: ClaimTransactionInfo }) {
  return (
    <span>
      Sending to {shortenAddress(info.recipient)} - {info.uniAmountRaw}
    </span>
  );
}

function XTTMinted() {
  return <span>Mint XTT tokens</span>;
}

function VestingTransaction({ info: { actionType, tokenSymbol } }: { info: VestingInfo }) {
  let actionTypeText: string;

  switch (actionType) {
    case VestingActionType.ENABLE:
      actionTypeText = 'Enabling';
      break;
    case VestingActionType.SAVE:
      actionTypeText = 'Saving';
      break;
    case VestingActionType.DISABLE:
      actionTypeText = 'Disabling';
      break;
  }

  return (
    <span>
      {actionTypeText} vesting: {tokenSymbol}
    </span>
  );
}

function UnlockLiquidityTransaction({ info: { tokenSymbol } }: { info: UnclockLiquidityInfo }) {
  return <span>Unlocking liquidity: {tokenSymbol}</span>;
}

const TransactionSummaryWrapper = styled.span`
  overflow: hidden;
  white-space: nowrap;
  word-break: break-all;
  text-overflow: ellipsis;
  height: 14px;
`;

function getTransactionSummaryContent(info: TransactionInfo) {
  switch (info.type) {
    case TransactionType.APPROVAL:
      return <ApprovalSummary info={info} />;
    case TransactionType.GENERATE:
      return <GenerateTransaction info={info} />;
    case TransactionType.SEND:
      return <SendTransaction info={info} />;
    case TransactionType.CREATE_PRESALE:
      return <CreatePresale info={info} />;
    case TransactionType.CREATE_SWAP:
      return <CreateSwap info={info} />;
    case TransactionType.REFUND:
      return <Refund info={info} />;
    case TransactionType.REDEEM:
      return <Redeem info={info} />;
    case TransactionType.CREATE_LOCK:
      return <CreateLockTransaction info={info} />;
    case TransactionType.FINALIZE_PRESALE:
      return <FinalizePresale info={info} />;
    case TransactionType.DEPOSIT_TOKENS:
      return <DepositTokens info={info} />;
    case TransactionType.UNLOCK_TOKENS:
      return <UnlockTokens info={info} />;
    case TransactionType.UPDATE_LOCKER:
      return <UpdateLocker info={info} />;
    case TransactionType.UPDATE_UNLOCK_TIME:
      return <UpdateUnlockTime info={info} />;
    case TransactionType.MINT_XTT:
      return <XTTMinted />;
    case TransactionType.VESTING:
      return <VestingTransaction info={info} />;
    case TransactionType.UNLOCK_LIQUIDITY:
      return <UnlockLiquidityTransaction info={info} />;
    case TransactionType.CLAIM:
      return <ClaimTransaction info={info} />;

    default:
      return <span>Unknown transaction type</span>;
  }
}

export function TransactionSummary({ info }: { info: TransactionInfo }) {
  return (
    <TransactionSummaryWrapper>{getTransactionSummaryContent(info)}</TransactionSummaryWrapper>
  );
}
