import styled from 'styled-components';
import { Flex } from '../../Flex';
import { TextInput } from '../TextInput';

interface IProps {
  value: string | number;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  currency?: string;
  margin?: string;
}

const CurrencyWrapper = styled.div`
  position: absolute;
  top: 0.8rem;
  right: 1rem;
  padding: 0.5rem;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.bg0};
`;

export default function CurrencyInput({
  value,
  onChange,
  placeholder,
  currency = 'XDC',
  margin,
}: IProps) {
  return (
    <Flex position='relative' margin={margin ? margin : 'auto'}>
      <TextInput
        padding={value ? '16px 83px 16px 16px' : '16px'}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          //@ts-ignore
          /\d+/.test(Number(e.target.value)) && onChange(e);
        }}
        placeholder={placeholder}
      />
      {value && <CurrencyWrapper>{currency}</CurrencyWrapper>}
    </Flex>
  );
}
