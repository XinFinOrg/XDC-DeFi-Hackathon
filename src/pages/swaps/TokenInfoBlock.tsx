import React from 'react';
import { formatUnits } from '@ethersproject/units';
import styled from 'styled-components/macro';
import { Wrappers } from '../../components/Wrappers';
import { formattedNum } from '../../utils/formattedNum';
import { TokenInfo } from './types';
interface Props {
  token: TokenInfo;
}
const Label = styled.div`
  font-size: 14px;
  font-weight: normal;
  opacity: 0.6;
`;
const Content = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Item = styled.div`
  padding-bottom: 10px;
  &:last-child {
    padding-bottom: 0px;
  }
`;

export const TokenInfoBlock = ({ token }: Props) => {
  return (
    <Wrappers
      padding='2rem 10px 1rem'
      style={{
        position: 'relative',
        top: '-20px',
        zIndex: 1,
        width: '100%',
      }}
    >
      <Item>
        <Label>Name:</Label>
        <Content>{token.name}</Content>
      </Item>
      <Item>
        <Label>Balance:</Label>
        <Content>{formattedNum(formatUnits(token.balance, token.decimals))}</Content>
      </Item>
    </Wrappers>
  );
};
