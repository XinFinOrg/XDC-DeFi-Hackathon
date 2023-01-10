import styled from 'styled-components';
import { Flex } from '../../components/Common/Flex';
import { Form } from './Form';
import { SwapType } from '../../store/swaps/interfaces/data.interface';

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
      swapType: SwapType.initiator,
      label: 'INITIATE SWAP',
      timeToLock: 40,
    },
    replier: {
      swapType: SwapType.replier,
      label: 'REPLY SWAP',
      timeToLock: 20,
    },
  };

  return (
    <FormsWrapper>
      <Form {...swapType.initiator} />
      <Form {...swapType.replier} />
    </FormsWrapper>
  );
};

export default Swaps;
