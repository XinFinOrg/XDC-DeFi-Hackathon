import { formatUnits } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { BaseButton, ButtonPrimary } from '../../components/Common/Button';
import Div from '../../components/Common/Div';
import { Flex } from '../../components/Common/Flex';
import TextInputWithStatus, { IType } from '../../components/Common/Inputs/TextInputWithStatus';
import Copyable from '../../components/Copyable';
import { AtomxER20 } from '../../constants/abis/types';
import { CHAIN_INFO } from '../../constants/chains';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { useAtomxContract } from '../../hooks/useContract';
import { ChainId } from '../../interfaces/connection-config.interface';
import { TransactionType } from '../../store/transactions/actions';
import { useTransactionAdderWithCallback } from '../../store/transactions/hooks';
import { getERC20Contract } from '../../utils/contract';
import { trySwitchingNetwork } from '../../utils/wallet';

const Label = styled.div`
  font-size: 14px;
  padding-bottom: 3px;
  font-weight: normal;
  opacity: 0.8;
`;
const Content = styled.div`
  font-size: 18px;
  font-weight: bold;
  word-break: break-all;
`;

const Item = styled.div`
  padding-bottom: 10px;
  &:last-child {
    padding-bottom: 0;
  }
`;

interface IProps {
  swapNumber: number;
  atomxContract: AtomxER20 | null;
  needToSwitch: ChainId | null;
  updateSwapNumber: () => void;
}

const initialCreateData = {
  amount: '',
  publicHash: '',
  receiverAddress: '',
  sender: '',
  leftTime: 0,
  token: '',
  secret: '',
};

export const ShowInfo = ({ swapNumber, atomxContract, needToSwitch, updateSwapNumber }: IProps) => {
  const [data, setData] = useState(initialCreateData);
  const { connector, activate } = useWeb3React();
  const { account, library } = useActiveWeb3React();
  const [secret, setSecret] = useState<string>('');
  const writeableAtomxContract = useAtomxContract();
  const addTxWithCallback = useTransactionAdderWithCallback();
  const [tokenSymbol, setTokenSymbol] = useState('');

  useEffect(() => {
    if (!atomxContract) return;
    atomxContract.audit(swapNumber).then((res) => {
      setData({
        token: res[0],
        leftTime: res[1].toNumber() * 1000 - Date.now(),
        amount: formatUnits(res[2]),
        receiverAddress: res[3],
        sender: res[4],
        publicHash: res[5],
        secret: '',
      });
    });
  }, [swapNumber, atomxContract]);

  const amIInitiator = useMemo(() => {
    return account === data.sender;
  }, [data.sender, account]);

  const handleRefund = async () => {
    if (writeableAtomxContract) {
      const res = await writeableAtomxContract.refund(swapNumber);
      addTxWithCallback(
        res,
        {
          type: TransactionType.REFUND,
          amount: `${data.amount + tokenSymbol}`,
        },
        () => {
          updateSwapNumber();
        },
      );
    }
  };
  const handleRedeem = async () => {
    if (writeableAtomxContract && account) {
      const res = await writeableAtomxContract.redeem(swapNumber, account, secret);
      addTxWithCallback(
        res,
        {
          type: TransactionType.REDEEM,
          amount: `${data.amount + tokenSymbol}`,
        },
        () => {
          updateSwapNumber();
        },
      );
    }
  };

  useEffect(() => {
    if (!data.token || !library || !account) return;
    const contract = getERC20Contract(library, data.token, account);
    contract.symbol().then((res) => setTokenSymbol(res));
  }, [data.token]);

  return (
    <Flex flexDirection='column' align='flex-start'>
      <Div padding='0 0 15px 0' fontSizePreset='large' fontWeightPreset='bold'>
        YOU HAVE A SWAP
      </Div>
      <Item>
        <Label>Token address:</Label>
        <Content>{data.token}</Content>
      </Item>
      <Item>
        <Label>Amount:</Label>
        <Content>
          {data.amount} {tokenSymbol}
        </Content>
      </Item>
      <Item>
        <Label>Sender:</Label>
        <Content>{data.sender}</Content>
      </Item>
      <Item>
        <Label>Receiver:</Label>
        <Content>{data.receiverAddress}</Content>
      </Item>
      <Item>
        <Label>Time to lock:</Label>
        <Content>
          {data.leftTime < 0 ? (
            <Div color='red'>Lock time is ended</Div>
          ) : (
            `${new Date(data.leftTime).getMinutes()} minutes`
          )}
        </Content>
      </Item>
      <Item>
        <Label>Public Hash:</Label>
        <Copyable content={data.publicHash} />
      </Item>
      {/*{data.secret && (*/}
      {/*  <Item>*/}
      {/*    <Label>Secret:</Label>*/}
      {/*    <Copyable content={data.publicHash} />*/}
      {/*  </Item>*/}
      {/*)}*/}

      <Flex justify='start' gap='0.3rem' flexWrap='wrap'>
        {needToSwitch && connector ? (
          <ButtonPrimary
            onClick={() => trySwitchingNetwork(connector, activate, needToSwitch)}
            width='fit-content'
            margin='0 auto'
          >
            {`Switch to ${CHAIN_INFO[needToSwitch].label}`}
          </ButtonPrimary>
        ) : (
          <>
            {amIInitiator ? (
              <>
                <BaseButton
                  bg='black'
                  color='white'
                  onClick={handleRefund}
                  disabled={Date.now() < data.leftTime * 1000}
                >
                  REFUND
                </BaseButton>
                {Date.now() < data.leftTime * 1000 && (
                  <span>* Refund will be activate after end of lock time</span>
                )}
              </>
            ) : (
              <>
                <TextInputWithStatus
                  type={IType.TEXT}
                  value={secret}
                  change={(v) => setSecret(v)}
                  label='SECRET KEY'
                  getStatus={(s) => console.log(s)}
                  placeholder='0x123...'
                />
                <BaseButton
                  bg='black'
                  color='white'
                  onClick={handleRedeem}
                  disabled={Date.now() < data.leftTime}
                >
                  REDEEM
                </BaseButton>
                {Date.now() < data.leftTime && (
                  <span>* Lock time is ended. Contact to sender.</span>
                )}
              </>
            )}
          </>
        )}
      </Flex>
    </Flex>
  );
};
