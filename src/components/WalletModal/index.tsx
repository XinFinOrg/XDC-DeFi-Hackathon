import { AbstractConnector } from '@web3-react/abstract-connector';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'react-feather';
import styled from 'styled-components/macro';
import MetamaskIcon from '../../assets/metamask.png';
import { injected } from '../../constants/connectors';
import usePrevious from '../../hooks/usePrevious';
import { ChainId } from '../../interfaces/connection-config.interface';
import { useAppDispatch } from '../../store';
import { useModalOpen, useWalletModalToggle } from '../../store/application/hooks';
import { ApplicationModal } from '../../store/application/reducer';
import { updateSelectedWallet } from '../../store/user/reducer';
import getConnectionName from '../../utils/getConnectorName';
import { isMobile } from '../../utils/userAgent';
import { setupNetwork, trySwitchingNetwork } from '../../utils/wallet';
import { connectorNamesArray, walletsByName } from '../../utils/web3React';
import AccountDetails from '../AccountDetails';
import Card from '../Card';
import { AutoColumn } from '../Column';
import { ButtonPrimary } from '../Common/Button';
import { Flex } from '../Common/Flex';
import Modal from '../Modal';
import Option from './Option';
import PendingView from './PendingView';

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;

const Wrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  margin: 0;
  padding: 0;
  width: 100%;
`;

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1.5rem 1rem 1.25rem;
  justify-content: center;
  font-weight: 700;
  color: ${(props) => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
`;

const ContentWrapper = styled.div`
  background-color: ${({ theme }) => theme.bg0};
  padding: 0 1rem 1.5rem;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 0 1rem 1rem 1rem`};
`;

const UpperSection = styled.div`
  position: relative;

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

const OptionGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    grid-gap: 10px;
  `};
`;

const HoverText = styled.div`
  text-decoration: none;
  color: ${({ theme }) => theme.text1};
  display: flex;
  align-items: center;

  :hover {
    cursor: pointer;
  }
`;

const LinkCard = styled(Card)`
  background-color: ${({ theme }) => theme.bg1};
  color: ${({ theme }) => theme.white};

  :hover {
    cursor: pointer;
    filter: brightness(0.9);
  }
`;

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
  LEGAL: 'legal',
};

export default function WalletModal({
  pendingTransactions,
  confirmedTransactions,
  ENSName,
}: {
  pendingTransactions: string[]; // hashes of pending
  confirmedTransactions: string[]; // hashes of confirmed
  ENSName?: string;
}) {
  // important that these are destructed from the account-specific web3-react context
  const { active, account, connector, activate, error, chainId } = useWeb3React();
  const dispatch = useAppDispatch();

  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);

  const [pendingWallet, setPendingWallet] = useState<AbstractConnector | undefined>();

  const [pendingError, setPendingError] = useState<boolean>();

  const walletModalOpen = useModalOpen(ApplicationModal.WALLET);
  const toggleWalletModal = useWalletModalToggle();

  const previousAccount = usePrevious(account);

  // close on connection, when logged out before
  useEffect(() => {
    if (account && !previousAccount && walletModalOpen) {
      toggleWalletModal();
    }
  }, [account, previousAccount, toggleWalletModal, walletModalOpen]);

  // always reset to account view
  useEffect(() => {
    if (walletModalOpen) {
      setPendingError(false);
      setWalletView(WALLET_VIEWS.ACCOUNT);
    }
  }, [walletModalOpen]);

  // close modal when a connection is successful
  const activePrevious = usePrevious(active);
  const connectorPrevious = usePrevious(connector);
  useEffect(() => {
    if (
      walletModalOpen &&
      ((active && !activePrevious) || (connector && connector !== connectorPrevious && !error))
    ) {
      setWalletView(WALLET_VIEWS.ACCOUNT);
    }
  }, [setWalletView, active, error, connector, walletModalOpen, activePrevious, connectorPrevious]);

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    setPendingWallet(connector); // set wallet for pending view
    setWalletView(WALLET_VIEWS.PENDING);

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector) {
      connector.walletConnectProvider = undefined;
    }

    if (!connector) return;

    try {
      await activate(connector, undefined, true);
      const connectionType = getConnectionName(connector);
      dispatch(updateSelectedWallet({ wallet: connectionType }));
    } catch (error) {
      if (error instanceof UnsupportedChainIdError) {
        console.warn('Unsupported chain. Trying to add chain.');

        const addedNetwork = await setupNetwork(chainId);
        if (addedNetwork) {
          console.info('Successfully added supported chain.');
          trySwitchingNetwork(connector, activate);
        }

        //activate(connector); // a little janky...can't use setError because the connector isn't set
      } else {
        setPendingError(true);
      }
    }
  };

  // get wallets user can switch too, depending on device/browser
  function getOptions() {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask;
    return connectorNamesArray.map((key) => {
      const option = walletsByName[key];
      // check for mobile options
      if (isMobile) {
        if (!window.web3 && !window.ethereum && option.mobile) {
          return (
            <Option
              onClick={() => {
                option.connector !== connector && !option.href && tryActivation(option.connector);
              }}
              id={`connect-${key}`}
              key={key}
              active={option.connector && option.connector === connector}
              color={option.color}
              link={option.href}
              header={option.name}
              subheader={null}
              icon={option.iconURL}
            />
          );
        }
        return null;
      }

      // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === 'MetaMask') {
            return (
              <Option
                id={`connect-${key}`}
                key={key}
                color={'#E8831D'}
                header={<span>Install Metamask</span>}
                subheader={null}
                link={'https://metamask.io/'}
                icon={MetamaskIcon}
              />
            );
          } else {
            return null; //dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === 'MetaMask' && !isMetamask) {
          return null;
        }
        // likewise for generic
        else if (option.name === 'Injected' && isMetamask) {
          return null;
        }
      }

      // return rest of options
      return (
        !isMobile &&
        !option.mobileOnly && (
          <Option
            id={`connect-${key}`}
            onClick={() => {
              option.connector === connector
                ? setWalletView(WALLET_VIEWS.ACCOUNT)
                : !option.href && tryActivation(option.connector);
            }}
            key={key}
            active={option.connector === connector}
            color={option.color}
            link={option.href}
            header={option.name}
            subheader={null} //use option.descriptio to bring back multi-line
            icon={option.iconURL}
          />
        )
      );
    });
  }

  function getModalContent() {
    if (error) {
      return (
        <UpperSection>
          <CloseIcon onClick={toggleWalletModal}>X</CloseIcon>
          <HeaderRow>
            {error instanceof UnsupportedChainIdError ? (
              'Wrong Network'
            ) : (
              <span>Error connecting</span>
            )}
          </HeaderRow>
          <ContentWrapper>
            {error instanceof UnsupportedChainIdError ? (
              <Flex flexDirection='column' gap='0.5rem' align='center'>
                <h5>
                  <span>Please connect to the appropriate network.</span>
                </h5>
                {connector && (
                  <Flex>
                    <ButtonPrimary
                      onClick={() => trySwitchingNetwork(connector, activate, ChainId.XDC_TEST)}
                      width='fit-content'
                      margin='0 auto'
                    >
                      Switch to XDC
                    </ButtonPrimary>
                    <ButtonPrimary
                      onClick={() => trySwitchingNetwork(connector, activate, ChainId.POLYGON_TEST)}
                      width='fit-content'
                      margin='0 auto'
                    >
                      Switch to POLYGON
                    </ButtonPrimary>
                  </Flex>
                )}
              </Flex>
            ) : (
              <span>Error connecting. Try refreshing the page.</span>
            )}
          </ContentWrapper>
        </UpperSection>
      );
    }
    // if (walletView === WALLET_VIEWS.LEGAL) {
    //   return (
    //     <UpperSection>
    //       <HeaderRow>
    //         <HoverText
    //           onClick={() => {
    //             setWalletView(
    //               (previousWalletView === WALLET_VIEWS.LEGAL
    //                 ? WALLET_VIEWS.ACCOUNT
    //                 : previousWalletView) ?? WALLET_VIEWS.ACCOUNT,
    //             );
    //           }}
    //         >
    //           <ArrowLeft />
    //         </HoverText>
    //         <Row justify="center">
    //           <ThemedText.MediumHeader>
    //             <span>Legal & Privacy</span>
    //           </ThemedText.MediumHeader>
    //         </Row>
    //       </HeaderRow>
    //       <PrivacyPolicy />
    //     </UpperSection>
    //   );
    // }
    if (account && walletView === WALLET_VIEWS.ACCOUNT) {
      return (
        <AccountDetails
          toggleWalletModal={toggleWalletModal}
          pendingTransactions={pendingTransactions}
          confirmedTransactions={confirmedTransactions}
          ENSName={ENSName}
          openOptions={() => setWalletView(WALLET_VIEWS.OPTIONS)}
        />
      );
    }
    return (
      <UpperSection>
        <CloseIcon onClick={toggleWalletModal}>X</CloseIcon>
        {walletView !== WALLET_VIEWS.ACCOUNT ? (
          <HeaderRow color='blue'>
            <HoverText
              onClick={() => {
                setPendingError(false);
                setWalletView(WALLET_VIEWS.ACCOUNT);
              }}
            >
              <ArrowLeft />
            </HoverText>
          </HeaderRow>
        ) : (
          <HeaderRow>
            <HoverText>
              <span>Connect a wallet</span>
            </HoverText>
          </HeaderRow>
        )}

        <ContentWrapper>
          <AutoColumn gap='16px'>
            {walletView === WALLET_VIEWS.PENDING ? (
              <PendingView
                connector={pendingWallet}
                error={pendingError}
                setPendingError={setPendingError}
                tryActivation={tryActivation}
              />
            ) : (
              <OptionGrid>{getOptions()}</OptionGrid>
            )}
          </AutoColumn>
        </ContentWrapper>
      </UpperSection>
    );
  }

  return (
    <Modal isOpen={walletModalOpen} onDismiss={toggleWalletModal} minHeight={false} maxHeight={90}>
      <Wrapper>{getModalContent()}</Wrapper>
    </Modal>
  );
}
