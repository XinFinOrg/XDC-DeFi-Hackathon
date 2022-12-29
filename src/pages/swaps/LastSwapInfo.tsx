import React, { useEffect, useState } from 'react';
import { AtomxER20 } from '../../constants/abis/types';
import { formatUnits } from '@ethersproject/units';
import { CreatedData } from './types';
import Copyable from '../../components/Copyable';
import styled from 'styled-components';
import { useAppDispatch } from '../../store';
import { setLastSwapInfo } from '../../store/swaps/actions';
import { useLastSwapInfo } from '../../store/swaps/hooks';

const Label = styled.div`
  font-size: 14px;
  padding-bottom: 3px;
  font-weight: normal;
  opacity: 0.8;
`;

const Item = styled.div`
  padding-bottom: 10px;
  &:last-child {
    padding-bottom: 0;
  }
`;

interface Props {
  swapNumber: number;
  atomxContract: AtomxER20 | null;
}

export const LastSwapInfo = ({ swapNumber, atomxContract }: Props) => {
  const lastSwapInfo = useLastSwapInfo();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!atomxContract) return;
    atomxContract.audit(swapNumber).then((res) => {
      console.log(res[1].toNumber());
      console.log(1111111111);

      dispatch(
        setLastSwapInfo({
          token: res[0],
          timestamp: res[1].toNumber() * 1000,
          amount: formatUnits(res[2]),
          receiverAddress: res[3],
          sender: res[4],
          publicHash: res[5],
          secret: res[6],
        }),
      );
    });
  }, [swapNumber, atomxContract]);
  return (
    <div>
      <Item>
        <Label>Secret of last Swap:</Label>
        <Copyable content={lastSwapInfo?.secret} />
      </Item>
    </div>
  );
};
