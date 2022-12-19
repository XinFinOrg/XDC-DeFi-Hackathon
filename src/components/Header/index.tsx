import { Link } from 'react-router-dom';
import styled from 'styled-components';
import headerLogo from '../../assets/header_logo_w.svg';
import { APP_NAME } from '../../constants';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { Flex } from '../Common/Flex';
import Web3Status from '../Web3Status';
import NetworkSelector from './NetworkSelector';

const HeaderWrapper = styled(Flex)`
  position: fixed;
  top: 0;
  z-index: 11;
  justify-content: space-between;
  align-items: flex-start;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    padding-left: 2.5rem;
  `};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-content: flex-end;
  `};
`;

const LogoElement = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0.3rem 1rem;
  :focus {
    border: 1px solid blue;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`;

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  width: fit-content;
  height: 40px;
  padding: 1.7rem 1rem;
  :focus {
    border: 1px solid blue;
  }
`;

const Header = () => {
  const { account } = useActiveWeb3React();

  return (
    <>
      <HeaderWrapper>
        <LogoElement>
          <Link
            to='/swaps'
            style={{
              height: '100%',
              width: '100%',
              maxWidth: '160px',
            }}
          >
            <img height='100%' width='100%' src={headerLogo} alt={APP_NAME} />
          </Link>
        </LogoElement>
        <AccountElement active={!!account}>
          <Web3Status />
          {account && (
            <Flex margin='0 0 0 0.75rem' width='auto'>
              <NetworkSelector />
            </Flex>
          )}
        </AccountElement>
      </HeaderWrapper>
    </>
  );
};

export default Header;
