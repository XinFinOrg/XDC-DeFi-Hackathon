import { isAddress } from 'ethers/lib/utils';
import { InputHTMLAttributes, useEffect, useState } from 'react';
import useIsContractAddress, { ICheckContract } from '../../../../hooks/useIsContractAddress';
import { Status } from '../../../../interfaces/statuses';
import Div from '../../Div';
import { Flex } from '../../Flex';
import { Span } from '../../Span';
import { TextInput } from '../TextInput';

export enum AddressType {
  Contract,
  Wallet,
  Both,
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  addressType?: AddressType;
  valid: (status: Status) => void;
}

export const AddressInput = ({
  addressType = AddressType.Both,
  valid,
  onChange,
  value,
  placeholder,
  name,
}: Props) => {
  const [address, setAddress] = useState('');
  const isContractAddress = useIsContractAddress();
  const [isValid, setIsValid] = useState<ICheckContract>({ status: Status.INITIAL, error: '' });

  const handleChange = (event: any) => {
    event.target.value = event.target.value.startsWith('xdc')
      ? '0x' + event.target.value.slice(3)
      : event.target.value;

    event.target.value = event.target.value.replace(/[^{x}a-fA-F0-9]/g, '');

    if (onChange) {
      onChange(event);
    }
    if (event.target.value.startsWith('xdc')) {
      setAddress('0x' + event.target.value.slice(3));
    } else {
      setAddress(event.target.value);
    }
  };

  useEffect(() => {
    if (addressType === AddressType.Contract) {
      isContractAddress(address).then((v) => {
        setIsValid(v);
      });
      return;
    }
    if (isAddress(address)) {
      setIsValid({ status: Status.SUCCESS, error: '' });
      return;
    }
    setIsValid({ status: Status.ERROR, error: 'Invalid address' });
  }, [isContractAddress, addressType, address]);

  useEffect(() => {
    valid(isValid.status);
  }, [isValid]);

  return (
    <Div width='100%'>
      <TextInput
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
        type='text'
        name={name}
        autoComplete='off'
      />
      {isValid.status === Status.ERROR && (
        <Flex display='block' padding='5px 0 0 10px'>
          <Span themeColor='error'>{isValid.error}</Span>
        </Flex>
      )}
    </Div>
  );
};
