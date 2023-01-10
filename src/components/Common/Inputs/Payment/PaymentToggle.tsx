import styled from 'styled-components';
import { StyledComponentProps } from '../../../../interfaces/styled-component-props.interface';
import { useAppDispatch } from '../../../../store';
import { useIsXTT } from '../../../../store/payment/hooks';
import { setIsXTT as setStoreIsXTT } from '../../../../store/payment/reducer';
import { Flex } from '../../Flex';
import PaymentTooltip from './PaymentTooltip';

export const HiddenInput = styled.input`
  display: none;
`;

export const RadioItem = styled.div`
  min-width: 5rem;
  &:first-child label {
    border-radius: 1.5rem 0 0 1.5rem;
  }
  &:last-child label {
    border-radius: 0 1.5rem 1.5rem 0;
  }

  /* Checked */
  input[type='radio']:checked + label {
    background-color: ${({ theme }) => theme.bg1};
    outline: 3px solid ${({ theme }) => theme.primary2};
    outline-offset: -3px;

    color: ${({ theme }) => theme.primary2};
    font-weight: 700;
  }
  input[type='radio']:checked + label:hover {
    color: ${({ theme }) => theme.primary2};
  }

  input[type='radio']:disabled + label {
    background-color: ${({ theme }) => theme.bg3};
    color: ${({ theme }) => theme.bg6};
  }
`;

export const ToggleLabel = styled.label`
  display: inline-block;
  width: 100%;
  text-align: center;
  cursor: pointer;
  user-select: none;

  color: ${({ theme }) => theme.text1};

  padding: 0.75rem 1rem;

  background-color: ${({ theme }) => theme.bg0};
  border: 1px solid ${({ theme }) => theme.bg5};

  &:hover {
    color: ${({ theme }) => theme.primary2};
  }
`;

interface PaymentToggleProps extends StyledComponentProps {
  discount?: number;
  hideTooltip?: boolean;
}

function PaymentToggle({ discount, hideTooltip, ...rest }: PaymentToggleProps) {
  const isXTT = useIsXTT();
  const dispatch = useAppDispatch();

  const handleChange = (toXTT: boolean) => {
    dispatch(setStoreIsXTT(toXTT));
  };

  return (
    <Flex justify='start' gap='1rem' {...rest}>
      <Flex justify='start' width='fit-content'>
        <RadioItem>
          <HiddenInput
            id='xtt'
            type='radio'
            name='radio'
            value='xtt'
            checked={isXTT}
            onChange={() => handleChange(true)}
          />
          <ToggleLabel htmlFor='xtt'>XTT</ToggleLabel>
        </RadioItem>
        <RadioItem>
          <HiddenInput
            id='xdc'
            type='radio'
            name='radio'
            value='xdc'
            checked={!isXTT}
            onChange={() => handleChange(false)}
          />
          <ToggleLabel htmlFor='xdc'>XDC</ToggleLabel>
        </RadioItem>
      </Flex>
      {!hideTooltip && <PaymentTooltip discount={discount} />}
    </Flex>
  );
}

export default PaymentToggle;
