import { millisecondsInMinute } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { IInputStatus } from '../../../../pages/swaps/types';
import Div from '../../Div';
import { Flex } from '../../Flex';
import { TextInput } from '../TextInput';

interface IProps {
  label?: string;
  getStatus: (status: IInputStatus) => void;
  change: (timestamp: number) => void;
}

const CurrencyWrapper = styled.div`
  padding: 12px;
  border-radius: 25px;
  color: black;
  background-color: ${({ color }) => color};
`;

export default function DateInputWithStatus({ getStatus, label, change }: IProps) {
  const [date, setDate] = useState('');
  const [status, setStatus] = useState(IInputStatus.EMPTY);

  useEffect(() => {
    getStatus(status);
  }, [status]);

  useEffect(() => {
    if (!date) {
      setStatus(IInputStatus.EMPTY);
      return;
    }

    const dateTimestamp = new Date(date).getTime();

    if (dateTimestamp < Date.now()) {
      setStatus(IInputStatus.INVALID);
      return;
    }
    change(dateTimestamp / 1000);
    if (dateTimestamp < Date.now() + 15 * millisecondsInMinute) {
      setStatus(IInputStatus.WARNING);
      return;
    }

    setStatus(IInputStatus.VALID);
  }, [date]);

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

  return (
    <Flex flexDirection='column' gap='.3rem' align='flex-start'>
      {label && <Div fontWeightPreset='bold'>{label}</Div>}
      <Flex justify='start' width='16rem'>
        <TextInput
          borderRadius='5px 0 0 5px'
          color='red'
          type='datetime-local'
          value={date}
          onChange={(e: any) => setDate(e.target.value)}
        />
        <Flex bg='black' height='36px' padding='6px 10px' borderRadius='0 5px 5px 0'>
          <CurrencyWrapper color={getStatusColor}></CurrencyWrapper>
        </Flex>
      </Flex>
    </Flex>
  );
}
