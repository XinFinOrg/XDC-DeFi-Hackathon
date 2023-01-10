import { BigNumber } from '@ethersproject/bignumber';
import { formatEther } from '@ethersproject/units';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { darken } from 'polished';
import { useEffect, useMemo, useState } from 'react';
import { Activity } from 'react-feather';
import styled from 'styled-components/macro';
import { NetworkContextName } from '../../constants/misc';
import { getChainSymbol } from '../../constants/networks';
import { useAppSelector } from '../../store';
import { useWalletModalToggle } from '../../store/application/hooks';
import { ApplicationModal } from '../../store/application/reducer';
import { isTransactionRecent, useAllTransactions } from '../../store/transactions/hooks';
import { TransactionDetails } from '../../store/transactions/reducer';
import { shortenAddress } from '../../utils';
import { floorStringNumber } from '../../utils/stringNumber';
import { BaseButton, ButtonSecondary } from '../Common/Button';
import Div from '../Common/Div';
import { Flex } from '../Common/Flex';
import Loader from '../Loader';
import WalletModal from '../WalletModal';

const AccountBalance = styled(Flex)`
  width: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 0rem;
  margin: 0 0.3rem;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.bg6};
  color: ${({ theme }) => theme.text5};
  background-color: ${({ pending, theme }) => (pending ? theme.primary1 : theme.bg6)};
`;

const AddressWrapper = styled(Div)`
  display: flex;
  justify-content: space-around;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.bg0};
  padding: 0.3rem;
  color: ${({ theme }) => theme.text1};
`;

const Web3StatusGeneric = styled(ButtonSecondary)`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  align-items: center;
  padding: 0.5rem;
  border-radius: 12px;
  cursor: pointer;
  user-select: none;
  :focus {
    outline: none;
  }
`;
const Web3StatusError = styled(Web3StatusGeneric)`
  background-color: ${({ theme }) => theme.red1};
  border: 1px solid ${({ theme }) => theme.red1};
  border-radius: 5px;
  color: ${({ theme }) => theme.white};
  font-weight: 500;
  :hover,
  :focus {
    background-color: ${({ theme }) => darken(0.1, theme.red1)};
  }
`;

const Text = styled.p`
  flex: 1 1 auto;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0.5rem 0 0.25rem;
  font-size: 1rem;
  width: fit-content;
  font-weight: 500;
`;

const NetworkIcon = styled(Activity)`
  margin-left: 0.25rem;
  margin-right: 0.5rem;
  width: 16px;
  height: 16px;
`;

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime;
}

function Web3StatusInner() {
  const { account, error, chainId, library } = useWeb3React();
  const [xdcData, setXdcData] = useState<{ balance: BigNumber; symbol: string }>();
  const allTransactions = useAllTransactions();

  useEffect(() => {
    if (!library || !account) return;

    const chainSymbol = getChainSymbol(chainId);
    library
      .getBalance(account)
      .then((balance: BigNumber) => {
        setXdcData({
          balance,
          symbol: chainSymbol,
        });
      })
      .catch((e: Error) => console.error('Error while getting xinfin balance\n', e));
  }, [library, account, chainId, allTransactions]);

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions);
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst);
  }, [allTransactions]);

  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash);

  const hasPendingTransactions = !!pending.length;
  const toggleWalletModal = useWalletModalToggle();

  if (account) {
    return (
      <AccountBalance
        id='web3-status-connected'
        onClick={toggleWalletModal}
        pending={hasPendingTransactions}
      >
        {hasPendingTransactions ? (
          <Div display='flex' padding='0.5rem'>
            <Text>{pending?.length} Pending</Text> <Loader stroke='white' />
          </Div>
        ) : (
          xdcData && (
            <AccountBalance>
              <Text style={{ flexShrink: 0, userSelect: 'none' }}>
                {`${floorStringNumber(formatEther(xdcData.balance), 2)} ${xdcData.symbol}`}
              </Text>
              <AddressWrapper>{shortenAddress(account)}</AddressWrapper>
            </AccountBalance>
          )
        )}
      </AccountBalance>
    );
  } else if (error) {
    return (
      <Web3StatusError onClick={toggleWalletModal}>
        <NetworkIcon />
        <Text>
          {error instanceof UnsupportedChainIdError ? (
            <span>Wrong Network</span>
          ) : (
            <span>Error</span>
          )}
        </Text>
      </Web3StatusError>
    );
  } else {
    return (
      <BaseButton id='connect-wallet' onClick={toggleWalletModal}>
        <Text>
          <span>Connect Wallet</span>
        </Text>
      </BaseButton>
    );
  }
}

export default function Web3Status() {
  const { active, account } = useWeb3React();
  const appState = useAppSelector((state) => state.application);
  const contextNetwork = useWeb3React(NetworkContextName);

  const allTransactions = useAllTransactions();

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions);
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst);
  }, [allTransactions]);

  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash);
  const confirmed = sortedRecentTransactions.filter((tx) => tx.receipt).map((tx) => tx.hash);

  return (
    <>
      <Web3StatusInner />
      {/* {(contextNetwork.active || active) && ( */}
      {(contextNetwork.active || active || appState.openModal === ApplicationModal.WALLET) && (
        <WalletModal
          ENSName={account ? shortenAddress(account) : undefined}
          pendingTransactions={pending}
          confirmedTransactions={confirmed}
        />
      )}
    </>
  );
}
