import styled from 'styled-components';
import { Flex } from '../../components/Common/Flex';
import { Form } from './Form';

const FormsWrapper = styled(Flex)`
  gap: 2rem;
  flex-wrap: nowrap;
  align-items: flex-start;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-wrap: wrap;
  `};
`;

const Swaps = () => {
  const swapType = {
    initiator: {
      value: 0,
      label: 'INITIATOR SWAP',
      timeToLock: 40,
    },
    replayer: {
      value: 1,
      label: 'REPLAYER SWAP',
      timeToLock: 20,
    },
  };

  return (
    <FormsWrapper>
      <Form swapType={swapType.initiator} />
      <Form swapType={swapType.replayer} />
    </FormsWrapper>
  );
};

export default Swaps;
