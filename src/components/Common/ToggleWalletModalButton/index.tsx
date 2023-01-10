import { ButtonProps } from 'rebass/styled-components';
import styled from 'styled-components';
import { useWalletModalToggle } from '../../../store/application/hooks';
import { ButtonSecondary } from '../Button';

const StyledButton = styled(ButtonSecondary)`
  background-color: rgba(21, 61, 111, 0.44);
  min-height: 41px;
  width: 200px;
`;

interface Props extends ButtonProps {
  content: string;
}

function ToggleWalletModalButton({ content }: Props) {
  const toggleWalletModal = useWalletModalToggle();

  return <StyledButton onClick={toggleWalletModal}>{content}</StyledButton>;
}

export default ToggleWalletModalButton;
