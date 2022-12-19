import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { Flex, FlexStyledComponentProps } from '../../Flex';
import { Span } from '../../Span';
import { InputErrorMessage, TextInput } from '../TextInput';

interface NumberInputStyledProps {
  removeSideBorders?: boolean;
}

const NumberInputComponent = styled(TextInput)<NumberInputStyledProps>`
  text-align: center;

  width: ${(props) => props.width || ''};

  ${(props) =>
    props.removeSideBorders
      ? `
      border-left: none;
      border-right: none;
      border-radius: 0;
      width: ${props.width || '86%'} ;`
      : ''};
`;

const NumberButton = styled.button`
  background-color: ${({ theme }) => theme.bg1};
  color: ${({ theme }) => theme.text1};
  border: 1px solid ${({ theme }) => theme.bg3};

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2em;
  padding: 0 16px;

  width: 7%;

  &:disabled {
    color: ${({ theme }) => theme.text3};
  }
`;

const LeftNumberButton = styled(NumberButton)`
  border-radius: 20px 0 0 20px;
`;

const RightNumberButton = styled(NumberButton)`
  border-radius: 0 20px 20px 0;
`;

interface NumberInputProps {
  onValueChange: (value: number | undefined) => void;
  validateValue?: (value: number) => string | undefined; //should return error message
  onValidationErrorChange?: (msg?: string) => void;
  name?: string;
  id?: string;
  initialValue?: number;
  minValue?: number;
  maxValue?: number;
  showAddjustButtons?: boolean;
  required?: boolean;
  textAlign?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent';
  label?: string;
  placeholder?: string;
  flexWrapper?: FlexStyledComponentProps;
}

function NumberInput(props: NumberInputProps) {
  const {
    onValueChange,
    validateValue,
    onValidationErrorChange,
    initialValue,
    minValue,
    maxValue,
    showAddjustButtons,
    name,
    id,
    required,
    textAlign = 'start',
    label,
    placeholder,
    flexWrapper,
  } = props;

  const [value, setValue] = useState<number | undefined>(initialValue);
  const [validationError, setValidationError] = useState<string | undefined>(undefined);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const numberValue = event.target.value;

    setNumberValue(numberValue);
  }

  function updateValidationError(error: string | undefined) {
    setValidationError(error);
    if (onValidationErrorChange) onValidationErrorChange(error);
  }

  function setNumberValue(newValue: string | number) {
    //undefined validation
    if (newValue === '') {
      if (required) updateValidationError('Value is required');

      setValue(undefined);
      onValueChange(undefined);
      return;
    }

    const numberValue = Number(newValue);
    if (isNaN(numberValue)) {
      updateValidationError('Only number possible');
      return;
    }

    //prop validation
    if (validateValue) {
      const errorMessage = validateValue(numberValue);

      if (errorMessage) {
        updateValidationError(errorMessage);
        return;
      }
    }

    //range validation
    if (minValue !== undefined && numberValue < minValue) {
      updateValidationError(`More than or equal to ${minValue} required`);
      return;
    }
    if (maxValue !== undefined && numberValue > maxValue) {
      updateValidationError(`Less than or equal to ${maxValue} required`);
      return;
    }

    updateValidationError(undefined);
    setValue(numberValue);
    onValueChange(numberValue);
  }

  return (
    <Flex {...flexWrapper} flexDirection='column' gap='0.8rem' align='flex-start'>
      {label && (
        <label htmlFor={id}>
          {label}
          {props.required && <Span themeColor='red1'> *</Span>}
        </label>
      )}
      <Flex>
        {showAddjustButtons && (
          <LeftNumberButton
            type='button'
            onClick={() => setNumberValue(value ? value - 1 : 0)}
            disabled={value === minValue}
          >
            -
          </LeftNumberButton>
        )}

        <NumberInputComponent
          value={value ?? ''}
          onChange={handleInputChange}
          removeSideBorders={showAddjustButtons}
          minWidth='30%'
          name={name}
          id={id}
          placeholder={placeholder}
          style={{ textAlign: textAlign ?? 'start' }}
        />

        {showAddjustButtons && (
          <RightNumberButton
            type='button'
            onClick={() => setNumberValue(value ? value + 1 : 0)}
            disabled={value === maxValue}
          >
            +
          </RightNumberButton>
        )}
      </Flex>
      {validationError && <InputErrorMessage>{validationError}</InputErrorMessage>}
    </Flex>
  );
}

export default NumberInput;
