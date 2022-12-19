import { Web3Provider } from '@ethersproject/providers';
import { parseUnits } from '@ethersproject/units';
import { BigNumber, ethers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import Div from '../../components/Common/Div';
import { Flex } from '../../components/Common/Flex';
import Select from '../../components/Common/Inputs/Select';
import TextInputWithStatus, { IType } from '../../components/Common/Inputs/TextInputWithStatus';
import Loader from '../../components/Loader';
import { Wrappers } from '../../components/Wrappers';
import { MAX_UINT256 } from '../../constants';
import { AtomxER20 } from '../../constants/abis/types';
import { ATOMX_ADDRESS } from '../../constants/addresses';
import { ALL_SUPPORTED_CHAIN_IDS, CHAIN_INFO } from '../../constants/chains';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { ChainId } from '../../interfaces/connection-config.interface';
import { Status } from '../../interfaces/statuses';
import { TransactionType } from '../../store/transactions/actions';
import { useTransactionAdderWithCallback } from '../../store/transactions/hooks';
import { BIG_MAX, BIG_ZERO } from '../../utils/bigNumber';
import { getAtomxContract, getERC20Contract } from '../../utils/contract';
import { multicallToken } from '../../utils/multicallToken';
import { trySwitchingNetwork } from '../../utils/wallet';
import { GenerateHash } from './GenerateHash';
import { ShowInfo } from './ShowInfo';
import { TokenInfoBlock } from './TokenInfoBlock';
import { CreateData, CreateDataStatus, IInputStatus, initialTokenInfo, TokenInfo } from './types';
import { LastSwapInfo } from './LastSwapInfo';
import styled from 'styled-components';
import { BaseButton, ButtonOutlined, ButtonPrimary } from '../../components/Common/Button';
import { useWeb3React } from '@web3-react/core';

const Limiter = styled(Flex)`
  ${({ theme }) => theme.mediaWidth.upToMedium`
    max-width: 100%;
  `};
`;

const initialCreateData: CreateData = {
  amount: '',
  publicHash: '',
  receiverAddress: '',
  timestamp: 0,
  token: '',
};

const initialCreateDataStatus: CreateDataStatus = {
  amount: IInputStatus.EMPTY,
  publicHash: IInputStatus.EMPTY,
  receiverAddress: IInputStatus.EMPTY,
  timestamp: IInputStatus.EMPTY,
  token: IInputStatus.EMPTY,
};

const MinutesVariants = [15, 30, 45, 60];

export const Form = () => {
  const { account, library, chainId } = useActiveWeb3React();
  const { connector, activate } = useWeb3React();
  const [selectedChainId, setSelectedChainId] = useState<ChainId>(ChainId.XDC_TEST);
  console.log(selectedChainId);
  const [status, setStatus] = useState<Status>(Status.INITIAL);
  const [swapNumber, setSwapNumber] = useState(0); // swap number
  const [lastSwapNumber, setLastSwapNumber] = useState(0); // swap number
  const [tokenInfo, setTokenInfo] = useState<TokenInfo>(initialTokenInfo);
  const [balance, setBalance] = useState<BigNumber>(BIG_ZERO);
  const [role, setRole] = useState(0);
  const addTransaction = useTransactionAdderWithCallback();
  const [atomxContract, setAtomxContract] = useState<AtomxER20 | null>(null);
  const [secretKey, setSecretKey] = useState('');

  const downloadTxtFile = () => {
    const element = document.createElement('a');
    const file = new Blob([secretKey], {
      type: 'text/plain',
    });
    element.href = URL.createObjectURL(file);
    element.download = 'SecretKey.txt';
    document.body.appendChild(element);
    element.click();
  };

  const selectedLibrary = useMemo<Web3Provider>(
    () =>
      new ethers.providers.JsonRpcProvider(CHAIN_INFO[selectedChainId].rpcUrls[0]) as Web3Provider,
    [selectedChainId],
  );

  const [data, setData] = useState(initialCreateData);
  const [dataStatus, setDataStatus] = useState<CreateDataStatus>(initialCreateDataStatus);

  const [minutes, setMinutes] = useState(15);
  useEffect(() => {
    const timestamp = Math.floor(Date.now() / 1000) + minutes * 60;
    setData((prev) => ({ ...prev, timestamp }));
  }, [minutes]);
  useEffect(() => {
    const contract = getAtomxContract(selectedLibrary, selectedChainId);
    setAtomxContract(contract);
    if (account) {
      setStatus(Status.PENDING);
      Promise.all([
        contract.activeSwap(account),
        contract.lastSwap(account),
        selectedLibrary.getBalance(account),
      ])
        .then((v) => {
          setStatus(Status.SUCCESS);
          setSwapNumber(Number(v[0].toString()));
          setLastSwapNumber(Number(v[1].toString()));
          setBalance(v[2]);
        })
        .catch(() => {
          setStatus(Status.ERROR);
        });
    }
  }, [selectedLibrary, account]);

  useEffect(() => {
    if (data.token && account && selectedLibrary) {
      multicallToken(
        selectedLibrary,
        selectedChainId,
        data.token,
        false,
        account,
        ATOMX_ADDRESS[selectedChainId],
      ).then(({ name, balance, allowance, symbol, decimals }) => {
        setTokenInfo({
          name,
          balance,
          allowance,
          symbol,
          decimals,
        });
      });
    }
  }, [data.token, account, selectedLibrary, selectedChainId]);

  const needToApprove = useMemo<boolean>(() => {
    if (tokenInfo.decimals && Number(data.amount) > 0) {
      return parseUnits(data.amount, tokenInfo.decimals).gt(tokenInfo.allowance);
    }
    return false;
  }, [tokenInfo, data.amount]);

  const needToSwitch = useMemo<ChainId | null>(() => {
    if (chainId !== selectedChainId) {
      return selectedChainId;
    }
    return null;
  }, [chainId, selectedChainId]);

  const handleUpdateAllowance = () => {
    setTokenInfo((prev) => ({ ...prev, allowance: BIG_MAX }));
  };

  const updateSwapNumber = () => {
    if (!atomxContract || !account) return;
    atomxContract.activeSwap(account).then((res) => {
      setSwapNumber(Number(res.toString()));
    });
  };

  const handleApprove = async () => {
    if (!library || !account || !chainId) {
      return;
    }
    const tokenContract = getERC20Contract(library, data.token, account);
    const res = await tokenContract.approve(ATOMX_ADDRESS[chainId as ChainId], MAX_UINT256);
    addTransaction(
      res,
      {
        type: TransactionType.APPROVAL,
        tokenAddress: data.token,
        tokenSymbol: tokenInfo.symbol,
        spender: ATOMX_ADDRESS[chainId as ChainId],
      },
      () => {
        handleUpdateAllowance.call(this);
      },
    );
  };

  const handleCreatePresale = async () => {
    if (!library || !chainId || !account) {
      return;
    }
    const contract = getAtomxContract(library, chainId, account);

    const res = await contract.initiateSwap(
      data.token,
      data.receiverAddress,
      data.publicHash,
      data.timestamp,
      parseUnits(data.amount, tokenInfo.decimals).toString(),
      { value: '0' },
    );

    addTransaction(
      res,
      {
        type: TransactionType.CREATE_SWAP,
        tokenSymbol: tokenInfo.symbol,
        amount: data.amount,
      },
      () => {
        downloadTxtFile();
        updateSwapNumber();
        handleUpdateAllowance.call(this);
      },
    );
  };

  return (
    <Wrappers>
      <Limiter>
        {status === Status.PENDING && (
          <Div
            width='100%'
            height='100%'
            display='flex'
            justify='center'
            align='center'
            position='absolute'
            zIndex='2'
          >
            <Loader size='30px' />
          </Div>
        )}
        <Flex
          flexDirection='column'
          gap='2rem'
          position='relative'
          style={{
            opacity: status === Status.PENDING ? '0.1' : '1',
          }}
        >
          <Select
            label='Select Network'
            width='100%'
            value={selectedChainId}
            change={(v) => setSelectedChainId(v)}
            options={ALL_SUPPORTED_CHAIN_IDS.map((id) => ({
              label: CHAIN_INFO[id].label,
              value: id,
            }))}
          />
          {lastSwapNumber !== 0 && (
            <LastSwapInfo swapNumber={lastSwapNumber} atomxContract={atomxContract} />
          )}
          {swapNumber !== 0 ? (
            <ShowInfo
              updateSwapNumber={updateSwapNumber}
              swapNumber={swapNumber}
              atomxContract={atomxContract}
              needToSwitch={needToSwitch}
            />
          ) : (
            <Flex flexDirection='column' gap='1rem' width='100%'>
              <Div fontSizePreset='large' fontWeightPreset='bold'>
                FILL THE FORM
              </Div>

              <Flex flexDirection='column'>
                <Flex style={{ zIndex: 10 }}>
                  <TextInputWithStatus
                    type={IType.ADDRESS}
                    value={data.token}
                    change={(v) => setData((prev) => ({ ...prev, token: v }))}
                    label='Sending token address'
                    getStatus={(s) => setDataStatus((prev) => ({ ...prev, token: s }))}
                    placeholder='0x123...'
                    props={data.token ? { boxShadow: 'none' } : {}}
                  />
                </Flex>

                {data.token && dataStatus.token === IInputStatus.VALID && account && (
                  <TokenInfoBlock token={tokenInfo} />
                )}
              </Flex>

              <TextInputWithStatus
                type={IType.NUMBER}
                value={data.amount}
                change={(v) => setData((prev) => ({ ...prev, amount: v }))}
                label='Amount'
                getStatus={(status) => console.log(status)}
                placeholder='0'
              />
              <Select
                label='Select time to lock'
                width='100%'
                value={minutes}
                change={(v) => setMinutes(v)}
                options={MinutesVariants.map((minutes) => ({
                  label: `${minutes} minutes`,
                  value: minutes,
                }))}
              />

              <TextInputWithStatus
                type={IType.ADDRESS}
                value={data.receiverAddress}
                change={(v) => setData((prev) => ({ ...prev, receiverAddress: v }))}
                label='Receiver address'
                getStatus={(status) => console.log(status)}
                placeholder='enter address'
              />

              <Select
                label='Choose the role'
                value={role}
                options={[
                  { value: 0, label: "I'm initiator (first)" },
                  { value: 1, label: "I'm replier (second)" },
                ]}
                change={(v) => {
                  setRole(v);
                  if (v) {
                    setData((prev) => ({ ...prev, publicHash: '' }));
                  }
                }}
              />
              {role === 0 ? (
                <GenerateHash
                  getSecretKey={(v) => setSecretKey(v)}
                  change={(publicHash) => setData((prev) => ({ ...prev, publicHash }))}
                />
              ) : (
                <TextInputWithStatus
                  type={IType.TEXT}
                  value={data.publicHash}
                  change={(v) => setData((prev) => ({ ...prev, publicHash: v }))}
                  label='Public HASH (copy from counterparty contract)'
                  getStatus={(status) => console.log(status)}
                  placeholder='enter hash'
                />
              )}

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
                    {needToApprove && (
                      <ButtonOutlined onClick={handleApprove}>APPROVE</ButtonOutlined>
                    )}
                    <BaseButton
                      bg='black'
                      color='white'
                      disabled={needToApprove}
                      onClick={handleCreatePresale}
                    >
                      CREATE SWAP
                    </BaseButton>
                  </>
                )}
              </Flex>
            </Flex>
          )}
        </Flex>
      </Limiter>
    </Wrappers>
  );
};
