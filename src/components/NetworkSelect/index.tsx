import styled from 'styled-components';
import { useAppDispatch } from '../../store';
import { setSelectedNetworks } from '../../store/swaps/actions';
import { useSwapSelectedNetwork } from '../../store/swaps/hooks';
import { Flex } from '../Common/Flex';

const Select = styled.select`
  padding: 0.72rem;
  padding-right: 1.5rem;
  width: fit-content;
  background-color: ${({ theme }) => theme.bg1};
  outline: none;
  border-radius: 20px;
  color: ${({ theme }) => theme.text1};
  border: 1px solid ${({ theme }) => theme.bg3};

  -webkit-appearance: none;
  -moz-appearance: none;
  background: url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")
    no-repeat;

  background-position-x: 97%;
  background-position-y: 10px;

  font-size: 16px;

  ::placeholder {
    color: ${({ theme }) => theme.text3};
  }

  transition: border 100ms;

  :focus {
    border: 1px solid ${({ theme }) => theme.primary1};
    outline: none;
  }
`;

const Option = styled.option`
  width: fit-content;
  font-size: 16px;
  padding: 1rem;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.bg3};
  text-transform: uppercase;
  background-color: ${({ theme }) => theme.bg1};
`;
const swapNetworks = [
  { label: 'Apothem Testnet', chainId: 51, token: 'TXDC' },
  { label: 'XDC MAINNET', chainId: 50, token: 'XDC' },
  { label: 'BSC Testnet', chainId: 97, token: 'TBNB' },
  { label: 'BSC Mainnet', chainId: 56, token: 'BNB' },
];

const SelectNetwork = () => {
  const selectedNetwork = useSwapSelectedNetwork();
  const dispatch = useAppDispatch();

  return (
    <Flex>
      <div>
        from:
        <Select
          id='social'
          name='from'
          onChange={(e) =>
            dispatch(setSelectedNetworks({ ...selectedNetwork, [e.target.name]: +e.target.value }))
          }
          value={selectedNetwork.from}
        >
          <Option disabled>- select -</Option>
          {swapNetworks
            .filter((network) => network.chainId !== selectedNetwork.to)
            .map((network, i) => (
              <Option value={network.chainId} key={i}>
                {network.label}
              </Option>
            ))}
        </Select>
      </div>
      <div>
        to:
        <Select
          id='social'
          name='to'
          onChange={(e) =>
            dispatch(setSelectedNetworks({ ...selectedNetwork, [e.target.name]: +e.target.value }))
          }
          value={selectedNetwork.to}
        >
          <Option disabled>- select -</Option>
          {swapNetworks
            .filter((network) => network.chainId !== selectedNetwork.from)
            .map((network, i) => (
              <Option value={network.chainId} key={i}>
                {network.label}
              </Option>
            ))}
        </Select>
      </div>
    </Flex>
  );
};

export default SelectNetwork;
