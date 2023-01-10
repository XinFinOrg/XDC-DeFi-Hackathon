import { useCallback, useMemo, useRef } from 'react';
import { ChevronDown } from 'react-feather';
import styled from 'styled-components/macro';
import { CHAIN_INFO } from '../../constants/chains';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { ChainId } from '../../interfaces/connection-config.interface';
import { useApplication, useModalOpen, useToggleModal } from '../../store/application/hooks';
import { ApplicationModal } from '../../store/application/reducer';
import { useSelectedWallet } from '../../store/user/hooks';
import { MEDIA_WIDTHS } from '../../theme';
import { switchToNetwork } from '../../utils/switchToNetwork';
import { ConnectorNames } from '../../utils/web3React';

const FlyoutHeader = styled.div`
  color: ${({ theme }) => theme.text2};
  font-weight: 400;
`;

const FlyoutMenu = styled.div`
  align-items: flex-start;
  border: 1px solid ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg0};
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.01), 0 4px 8px rgba(0, 0, 0, 0.04),
    0 16px 24px rgba(0, 0, 0, 0.04), 0 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  overflow: auto;
  padding: 16px;
  position: absolute;
  top: 64px;
  right: 0;
  width: 272px;
  z-index: 99;
  & > *:not(:last-child) {
    margin-bottom: 12px;
  }
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    top: 50px;
  }
`;
const FlyoutRow = styled.div<{ active: boolean }>`
  align-items: center;
  background-color: ${({ active, theme }) => (active ? theme.bg1 : 'transparent')};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  font-weight: 500;
  justify-content: space-between;
  padding: 6px 8px;
  text-align: left;
  width: 100%;
`;
const FlyoutRowActiveIndicator = styled.div`
  background-color: ${({ theme }) => theme.green1};
  border-radius: 50%;
  height: 9px;
  width: 9px;
`;
const Logo = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 8px;
`;
const NetworkLabel = styled.div`
  flex: 1 1 auto;
`;
const SelectorLabel = styled(NetworkLabel)`
  display: none;
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    display: block;
    margin-right: 8px;
  }
`;
const SelectorControls = styled.div<{ interactive: boolean }>`
  align-items: center;
  background-color: ${({ theme }) => theme.bg1};
  border: 1px solid ${({ theme }) => theme.text1};
  border-radius: 5px;
  color: ${({ theme }) => theme.text1};
  cursor: ${({ interactive }) => (interactive ? 'pointer' : 'auto')};
  display: flex;
  font-weight: 500;
  justify-content: space-between;
  padding: 6px 8px;
  /* min-width: 100px; */
`;
const SelectorLogo = styled(Logo)<{ interactive?: boolean }>`
  margin-right: ${({ interactive }) => (interactive ? 8 : 0)}px;
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    margin-right: 8px;
  }
`;
const SelectorWrapper = styled.div`
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    position: relative;
  }
`;
const StyledChevronDown = styled(ChevronDown)`
  width: 12px;
`;

export default function NetworkSelector() {
  const { chainId, library } = useActiveWeb3React();
  const node = useRef<HTMLDivElement>();
  const open = useModalOpen(ApplicationModal.NETWORK_SELECTOR);
  const toggle = useToggleModal(ApplicationModal.NETWORK_SELECTOR);
  const selectedWallet = useSelectedWallet();

  useOnClickOutside(node, open ? toggle : undefined);
  const { implements3085 } = useApplication();

  const info = chainId ? CHAIN_INFO[chainId] : undefined;
  const showSelector = useMemo(() => {
    return Boolean(implements3085) && selectedWallet !== ConnectorNames.WalletConnect;
  }, [implements3085, selectedWallet]);
  const mainnetInfo = CHAIN_INFO[ChainId.XDC_PROD];

  const conditionalToggle = useCallback(() => {
    if (showSelector) {
      toggle();
    }
  }, [showSelector, toggle]);

  if (!chainId || !info || !library) {
    return null;
  }

  function Row({ targetChain }: { targetChain: number }) {
    if (!library || !chainId || (!implements3085 && targetChain !== chainId)) {
      return null;
    }
    const handleRowClick = () => {
      switchToNetwork({ library, chainId: targetChain });
      toggle();
    };
    const active = chainId === targetChain;
    const rowText = `${CHAIN_INFO[targetChain].label}${''}`;
    const RowContent = () => (
      <FlyoutRow onClick={handleRowClick} active={active}>
        <Logo src={CHAIN_INFO[targetChain].logoUrl} />
        <NetworkLabel>{rowText}</NetworkLabel>
        {chainId === targetChain && <FlyoutRowActiveIndicator />}
      </FlyoutRow>
    );
    return <RowContent />;
  }

  return (
    <SelectorWrapper ref={node as any}>
      <SelectorControls onClick={conditionalToggle} interactive={showSelector}>
        <SelectorLogo interactive={showSelector} src={info.logoUrl || mainnetInfo.logoUrl} />
        <SelectorLabel>{info.label}</SelectorLabel>
        {showSelector && <StyledChevronDown />}
      </SelectorControls>
      {open && (
        <FlyoutMenu>
          <FlyoutHeader>Select a network</FlyoutHeader>
          <Row targetChain={ChainId.BSC_TEST} />
          <Row targetChain={ChainId.XDC_TEST} />
          <Row targetChain={ChainId.POLYGON_TEST} />
        </FlyoutMenu>
      )}
    </SelectorWrapper>
  );
}
