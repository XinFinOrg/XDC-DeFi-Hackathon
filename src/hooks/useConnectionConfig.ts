import { useMemo } from 'react';
import ATOMX_ABI from '../constants/abis/AtomxER20.json';
import MulticallABI from '../constants/abis/Multicall.json';
import { ATOMX_ADDRESS, MULTICALL_ADDRESS } from '../constants/addresses';
import { CHAIN_INFO } from '../constants/chains';
import { ChainId, IConnectionConfig } from '../interfaces/connection-config.interface';
import useActiveWeb3React from './useActiveWeb3React';

const { XDC_PROD } = ChainId;

export const useConnectionConfig = (): IConnectionConfig => {
  const { chainId } = useActiveWeb3React();

  const chainIdValue = useMemo<ChainId>(() => {
    if (chainId === undefined) {
      return XDC_PROD;
    }
    return chainId;
  }, [chainId]);

  return useMemo<IConnectionConfig>(
    () => ({
      ...CHAIN_INFO[chainIdValue],
      multicall: {
        abi: MulticallABI,
        address: MULTICALL_ADDRESS[chainIdValue],
      },
      atomx: {
        abi: ATOMX_ABI.abi,
        address: ATOMX_ADDRESS[chainIdValue],
      },
    }),
    [chainIdValue],
  );
};
