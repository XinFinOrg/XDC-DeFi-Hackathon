import { Web3Provider } from '@ethersproject/providers';
import { Contract } from 'ethers';
import { useCallback, useMemo } from 'react';
import { AtomxER20, Multicall } from '../constants/abis/types';
import { getContract } from '../utils/contract';
import useActiveWeb3React from './useActiveWeb3React';
import { useConnectionConfig } from './useConnectionConfig';
import useDebounce from './useDebounce';

export function useContract<T = Contract>(
  getContractFunction: (library: Web3Provider, account?: string) => T,
): T | null {
  const { account, chainId, library } = useActiveWeb3React();

  return useDebounce(
    useMemo((): T | null => {
      if (!library || !chainId) {
        return null;
      }
      const contract: T | null = getContractFunction(library, account || undefined);
      if (!contract) {
        return null;
      }

      return contract;
    }, [getContractFunction, account, chainId, library]),
    100,
  );
}

export function useMulticallContract(): Multicall | null {
  const { multicall } = useConnectionConfig();
  const multi = useCallback(
    (library: Web3Provider, account?: string) => {
      return getContract(multicall.address, multicall.abi, library, account) as Multicall;
    },
    [multicall],
  );
  return useContract<Multicall>(multi);
}

export function useAtomxContract(): AtomxER20 | null {
  const { atomx } = useConnectionConfig();
  const atom = useCallback(
    (library: Web3Provider, account?: string) => {
      return getContract(atomx.address, atomx.abi, library, account) as AtomxER20;
    },
    [atomx],
  );
  return useContract<AtomxER20>(atom);
}
