import styled from 'styled-components';
import { ChainId } from '../../../../interfaces/connection-config.interface';
import Div from '../../Div';
import { Flex } from '../../Flex';

const SelectStyled = styled.select<{ width?: string }>`
  padding: 0.5rem;
  padding-right: 1.7rem;
  width: ${({ width }) => width || 'auto'};
  outline: none;
  border-radius: 10px;
  color: ${({ theme }) => theme.text1_inverse};
  border: 1px solid ${({ theme }) => theme.bg6};

  -webkit-appearance: none;
  -moz-appearance: none;
  background: url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")
    no-repeat;
  background-color: ${({ theme }) => theme.bg6};

  background-position-x: calc(100% - 5px);
  background-position-y: 5px;
  font-size: 16px;

  ::placeholder {
    color: ${({ theme }) => theme.text1_inverse};
  }

  transition: border 100ms;

  :focus {
    border: 1px solid ${({ theme }) => theme.text1_inverse};
    outline: none;
  }
`;

const Option = styled.option`
  width: fit-content;
  font-size: 16px;
  padding: 1rem;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.bg3};
  text-transform: uppercase;
  background-color: ${({ theme }) => theme.bg6};
`;

interface IProps {
  label?: string;
  width?: string;
  value: ChainId;
  change: (chainId: any) => void;
  options: { value: any; label: string }[];
}

export default function Select({ width, change, label, value, options }: IProps) {
  return (
    <Flex flexDirection='column' gap='.3rem' align='flex-start' width={width}>
      {label && <Div fontWeightPreset='bold'>{label}</Div>}
      <SelectStyled onChange={(e) => change(+e.target.value)} value={value} width={width}>
        {options.map(({ value, label }, i) => (
          <Option value={value} key={`${i}-${label}`}>
            {label}
          </Option>
        ))}
      </SelectStyled>
    </Flex>
  );
}
