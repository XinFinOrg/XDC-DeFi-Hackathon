import { isAddress } from 'ethers/lib/utils';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { StyledComponentProps } from '../../../../interfaces/styled-component-props.interface';
import { IInputStatus } from '../../../../pages/swaps/types';
import Div from '../../Div';
import { Flex } from '../../Flex';
import { TextInput } from '../TextInput';

export enum IType {
  ADDRESS = 'ADDRESS',
  NUMBER = 'NUMBER',
  TEXT = 'TEXT',
}

interface IProps {
  margin?: string;
  width?: string;
  placeholder?: string;
  currency?: string;
  label?: string;
  type: IType;
  getStatus: (status: IInputStatus) => void;
  value?: string;
  change: (v: string) => void;
  props?: StyledComponentProps;
  readOnly?: boolean;
}

const CurrencyWrapper = styled.div`
  right: 6px;
  padding: 12px;
  border-radius: 25px;
  color: black;
  background-color: ${({ color }) => color};
  position: absolute;
`;

export default function TextInputWithStatus({
  placeholder,
  currency,
  width,
  getStatus,
  label,
  type,
  change,
  value,
  props = {},
  readOnly,
}: IProps) {
  const [internalValue, setInternalValue] = useState(value);
  const [status, setStatus] = useState(IInputStatus.EMPTY);

  useEffect(() => {
    getStatus(status);
  }, [status]);

  useEffect(() => {
    if (!internalValue) {
      setStatus(IInputStatus.EMPTY);
      return;
    }
    if (type === IType.NUMBER || type === IType.TEXT) {
      if (internalValue) {
        setStatus(IInputStatus.VALID);
        return;
      }
      return;
    }
    if (type === IType.ADDRESS) {
      if (isAddress(internalValue)) {
        setStatus(IInputStatus.VALID);
        return;
      } else {
        setStatus(IInputStatus.INVALID);
        return;
      }
    }
  }, [internalValue]);

  const getStatusColor = useMemo(() => {
    if (status === IInputStatus.EMPTY) {
      return 'white';
    }
    if (status === IInputStatus.INVALID) {
      return 'red';
    }
    if (status === IInputStatus.WARNING) {
      return 'yellow';
    }
    if (status === IInputStatus.VALID) {
      return 'green';
    }
  }, [status]);

  const handleChange = (v: string) => {
    setInternalValue(v);
    change(v);
  };

  return (
    <Flex flexDirection='column' gap='.3rem' align='flex-start' width={width}>
      {label && <Div fontWeightPreset='bold'>{label}</Div>}
      <Flex position='relative' justify='flex-start' width='100%'>
        <TextInput
          padding={'6px 36px 6px 10px'}
          value={internalValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
          placeholder={placeholder}
          {...props}
          type={type === IType.NUMBER ? 'number' : 'text'}
          readOnly={readOnly}
        />
        <CurrencyWrapper color={getStatusColor}>{currency}</CurrencyWrapper>
      </Flex>
    </Flex>
  );
}
