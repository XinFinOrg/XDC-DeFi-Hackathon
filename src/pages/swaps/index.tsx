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
  return (
    <FormsWrapper>
      <Form />
      <Form />
    </FormsWrapper>
  );
};

export default Swaps;
