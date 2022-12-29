import { Web3Provider } from '@ethersproject/providers';
import { parseUnits } from '@ethersproject/units';
import { BigNumber, ethers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
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
import { Span } from '../../components/Common/Span';

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

const Overlapping = styled(Flex)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: ${({ theme }) => `${theme.bg1}ee`};
  border-radius: 10px;
  z-index: 2;
`;

interface IProps {
  swapType: {
    value: number;
    label: string;
    timeToLock: number;
  };
}

export const Form = ({ swapType }: IProps) => {
  const { account, library, chainId } = useActiveWeb3React();
  const { connector, activate } = useWeb3React();
  const [status, setStatus] = useState<Status>(Status.INITIAL);
  const [swapNumber, setSwapNumber] = useState(0); // swap number
  const [lastSwapNumber, setLastSwapNumber] = useState(0); // swap number
  const [tokenInfo, setTokenInfo] = useState<TokenInfo>(initialTokenInfo);
  const [balance, setBalance] = useState<BigNumber>(BIG_ZERO);
  const [role, setRole] = useState(0);
  const addTransaction = useTransactionAdderWithCallback();
  const [atomxContract, setAtomxContract] = useState<AtomxER20 | null>(null);
  const [secretKey, setSecretKey] = useState('');
  const getSelectedChainIdFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('selectedChainIds') || '{}');
  };

  const [selectedChainId, setSelectedChainId] = useState<ChainId>(
    getSelectedChainIdFromLocalStorage()[swapType.value] || ChainId.XDC_TEST,
  );

  const setSelectedChainIdInLocalStorage = (chainId: ChainId) => {
    const selectedChainIdFromStorage = getSelectedChainIdFromLocalStorage();

    selectedChainIdFromStorage[swapType.value] = chainId;
    localStorage.setItem('selectedChainIds', JSON.stringify(selectedChainIdFromStorage));
    setSelectedChainId(getSelectedChainIdFromLocalStorage()[swapType.value]);
  };

  const downloadTxtFile = () => {
    if (!secretKey) return;
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

  useEffect(() => {
    setRole(swapType.value);
    const timestamp = Math.floor(Date.now() / 1000) + swapType.timeToLock * 60;
    setData((prev) => ({ ...prev, timestamp }));
  }, [swapType]);

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

  const overlappingContent = useMemo(() => {
    if (status === Status.SUCCESS) {
      return (
        <Overlapping>
          <Loader size='30px' />
        </Overlapping>
      );
    }
    return;
  }, [status]);

  return (
    <Flex flexDirection='column' width='50%' align='stretch' gap='1rem'>
      <Select
        label='Select Network'
        value={selectedChainId}
        change={(v) => setSelectedChainIdInLocalStorage(v)}
        options={ALL_SUPPORTED_CHAIN_IDS.map((id) => ({
          label: CHAIN_INFO[id].label,
          value: id,
        }))}
      />
      <Wrappers>
        <Limiter>
          {overlappingContent}

          <Flex flexDirection='column' gap='2rem' position='relative'>
            <Flex>
              <Span fontSizePreset='large' fontWeightPreset='bold'>
                {swapType.label}
              </Span>
            </Flex>
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

                <TextInputWithStatus
                  type={IType.TEXT}
                  change={(v) => console.log(v)}
                  value={`${swapType.timeToLock} minutes`}
                  label='Time to lock'
                  getStatus={(status) => console.log(status)}
                  placeholder='0'
                  readOnly={true}
                />

                <TextInputWithStatus
                  type={IType.ADDRESS}
                  value={data.receiverAddress}
                  change={(v) => setData((prev) => ({ ...prev, receiverAddress: v }))}
                  label='Receiver address'
                  getStatus={(status) => console.log(status)}
                  placeholder='enter address'
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
    </Flex>
  );
};
