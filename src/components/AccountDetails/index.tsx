import { AbstractConnector } from '@web3-react/abstract-connector';
import { useCallback, useContext } from 'react';
import { ExternalLink as LinkIcon } from 'react-feather';
import styled, { ThemeContext } from 'styled-components/macro';
import { injected, walletlink } from '../../constants/connectors';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { useAppDispatch } from '../../store';
import { clearAllTransactions } from '../../store/transactions/actions';
import { updateSelectedWallet } from '../../store/user/reducer';
import { ExternalLink, LinkStyledButton, ThemedText } from '../../theme';
import { shortenAddress } from '../../utils';
import { ExplorerDataType, getExplorerLink } from '../../utils/getExplorerLink';
import { ConnectorNames, connectorNamesArray, walletsByName } from '../../utils/web3React';
import { ButtonSecondary } from '../Common/Button';
import { Span } from '../Common/Span';
import StatusIcon from '../Identicon/StatusIcon';
import { AutoRow } from '../Row';
import Copy from './Copy';
import Transaction from './Transaction';

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${(props) => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
`;

const UpperSection = styled.div`
  position: relative;
  width: 100%;

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`;

const InfoCard = styled.div`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: 10px;
  position: relative;
  display: grid;
  grid-row-gap: 12px;
  margin-bottom: 20px;
`;

const AccountGroupingRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  color: ${({ theme }) => theme.text1};

  div {
    ${({ theme }) => theme.flexRowNoWrap}
    align-items: center;
  }
`;

const AccountSection = styled.div`
  padding: 0 1rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 0rem 1rem 1.5rem 1rem;`};
`;

const YourAccount = styled.div`
  h5 {
    margin: 0 0 1rem 0;
    font-weight: 400;
  }

  h4 {
    margin: 0;
    font-weight: 500;
  }
`;

const LowerSection = styled.div`
  width: 100%;

  ${({ theme }) => theme.flexColumnNoWrap}
  padding: 1.5rem;
  overflow: auto;
  background-color: ${({ theme }) => theme.bg2};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  h5 {
    margin: 0;
    font-weight: 400;
    color: ${({ theme }) => theme.text3};
  }
`;

const AccountControl = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 0;
  width: 100%;

  font-weight: 500;
  font-size: 1.25rem;

  a:hover {
    text-decoration: underline;
  }

  p {
    min-width: 0;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const AddressLink = styled(ExternalLink)<{ hasENS: boolean; isENS: boolean }>`
  font-size: 0.825rem;
  color: ${({ theme }) => theme.text3};
  margin-left: 1rem;
  display: flex;
  :hover {
    color: ${({ theme }) => theme.text2};
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;

// const CloseColor = styled(Close)`
//   path {
//     stroke: ${({ theme }) => theme.text4};
//   }
// `;

const WalletName = styled.div`
  width: initial;
  font-size: 0.825rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text3};
`;

const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: flex-end;
  `};
`;

function WrappedStatusIcon({ connector }: { connector: AbstractConnector }) {
  return (
    <IconWrapper size={16}>
      <StatusIcon connector={connector} />
    </IconWrapper>
  );
}

const TransactionListWrapper = styled.div`
  padding: 0 1rem;
  max-height: 300px;
  overflow: auto;

  &::-webkit-scrollbar-track {
    background-color: #121212;
  }

  &::-webkit-scrollbar-thumb {
    background-image: linear-gradient(0deg, #0080ff, #004277);
    border-radius: 10px;
  }

  &::-webkit-scrollbar {
    width: 1px;
  }

  ${({ theme }) => theme.flexColumnNoWrap};
`;

const WalletAction = styled(ButtonSecondary)`
  width: fit-content;
  font-weight: 400;
  margin-left: 8px;
  font-size: 0.825rem;
  padding: 4px 6px;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

function renderTransactions(transactions: string[]) {
  return (
    <TransactionListWrapper>
      {transactions.map((hash, i) => {
        return <Transaction key={i} hash={hash} />;
      })}
    </TransactionListWrapper>
  );
}

interface AccountDetailsProps {
  toggleWalletModal: () => void;
  pendingTransactions: string[];
  confirmedTransactions: string[];
  ENSName?: string;
  openOptions: () => void;
}

export default function AccountDetails({
  toggleWalletModal,
  pendingTransactions,
  confirmedTransactions,
  ENSName,
  openOptions,
}: AccountDetailsProps) {
  const { chainId, account, connector, deactivate } = useActiveWeb3React();
  const theme = useContext(ThemeContext);
  const dispatch = useAppDispatch();

  const isMetaMask = !!window.ethereum?.isMetaMask;

  function formatConnectorName() {
    const { ethereum } = window;
    const isMetaMask = !!(ethereum && ethereum.isMetaMask);
    const name = connectorNamesArray
      .filter(
        (k) =>
          walletsByName[k].connector === connector &&
          (connector !== injected || isMetaMask === (k === ConnectorNames.Injected)),
      )
      .map((k) => walletsByName[k].name)[0];

    return (
      <WalletName>
        <span>Connected with {name}</span>
      </WalletName>
    );
  }

  const clearAllTransactionsCallback = useCallback(() => {
    if (chainId) dispatch(clearAllTransactions({ chainId }));
  }, [dispatch, chainId]);

  function DeactivateConnector() {
    dispatch(updateSelectedWallet({ wallet: undefined }));
    deactivate();
    toggleWalletModal();
  }

  return (
    <>
      <UpperSection>
        <CloseIcon onClick={toggleWalletModal}>
          &#10005;
          {/* <CloseColor /> */}
        </CloseIcon>
        <HeaderRow>
          <span>Account</span>
        </HeaderRow>
        <AccountSection>
          <YourAccount>
            <InfoCard>
              <AccountGroupingRow>
                {formatConnectorName()}
                <div>
                  {connector !== injected && connector !== walletlink && (
                    <WalletAction style={{ marginRight: '8px' }} onClick={DeactivateConnector}>
                      <Span fontSizePreset='extra-small' color='currentColor'>
                        Disconnect
                      </Span>
                    </WalletAction>
                  )}
                  <WalletAction
                    onClick={() => {
                      openOptions();
                    }}
                  >
                    <Span fontSizePreset='extra-small' color='currentColor'>
                      Change
                    </Span>
                  </WalletAction>
                </div>
              </AccountGroupingRow>
              <AccountGroupingRow id='web3-account-identifier-row'>
                <AccountControl>
                  {ENSName ? (
                    <>
                      <div>
                        {connector && <WrappedStatusIcon connector={connector} />}
                        <p> {ENSName}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        {connector && <WrappedStatusIcon connector={connector} />}
                        <p> {account && shortenAddress(account)}</p>
                      </div>
                    </>
                  )}
                </AccountControl>
              </AccountGroupingRow>
              <AccountGroupingRow>
                {ENSName ? (
                  <>
                    <AccountControl>
                      <div>
                        {account && (
                          <Copy toCopy={account}>
                            <span style={{ marginLeft: '4px' }}>
                              <span>Copy Address</span>
                            </span>
                          </Copy>
                        )}
                        {chainId && account && (
                          <AddressLink
                            hasENS={!!ENSName}
                            isENS={true}
                            href={getExplorerLink(chainId, account, ExplorerDataType.ADDRESS)}
                          >
                            <LinkIcon size={16} />
                            <span style={{ marginLeft: '4px' }}>
                              <span>View on Explorer</span>
                            </span>
                          </AddressLink>
                        )}
                      </div>
                    </AccountControl>
                  </>
                ) : (
                  <>
                    <AccountControl>
                      <div>
                        {account && (
                          <Copy toCopy={account}>
                            <span style={{ marginLeft: '4px' }}>
                              <span>Copy Address</span>
                            </span>
                          </Copy>
                        )}
                        {chainId && account && (
                          <AddressLink
                            hasENS={!!ENSName}
                            isENS={false}
                            href={getExplorerLink(chainId, account, ExplorerDataType.ADDRESS)}
                          >
                            <LinkIcon size={16} />
                            <span style={{ marginLeft: '4px' }}>
                              <span>View on Explorer</span>
                            </span>
                          </AddressLink>
                        )}
                      </div>
                    </AccountControl>
                  </>
                )}
              </AccountGroupingRow>
            </InfoCard>
          </YourAccount>
        </AccountSection>
      </UpperSection>
      {!!pendingTransactions.length || !!confirmedTransactions.length ? (
        <LowerSection>
          <AutoRow mb={'1rem'} style={{ justifyContent: 'space-between' }}>
            <ThemedText.Body>
              <span>Recent Transactions</span>
            </ThemedText.Body>
            <LinkStyledButton onClick={clearAllTransactionsCallback}>
              <span>(clear all)</span>
            </LinkStyledButton>
          </AutoRow>
          {renderTransactions(pendingTransactions)}
          {renderTransactions(confirmedTransactions)}
        </LowerSection>
      ) : (
        <LowerSection>
          <ThemedText.Body color={theme.text1}>
            <span>Your transactions will appear here...</span>
          </ThemedText.Body>
        </LowerSection>
      )}
    </>
  );
}
