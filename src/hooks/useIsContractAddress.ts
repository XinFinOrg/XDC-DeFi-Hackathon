import { isAddress } from '@ethersproject/address';
import { useCallback } from 'react';
import { Status } from '../interfaces/statuses';
import useActiveWeb3React from './useActiveWeb3React';

export interface ICheckContract {
  status: Status;
  error: string;
}

const useIsContractAddress = () => {
  const { library } = useActiveWeb3React();

  const initialState: ICheckContract = {
    status: Status.INITIAL,
    error: '',
  };

  const contractStatus = async (addr: string): Promise<ICheckContract> => {
    const code = await library?.getCode(addr);
    if (code !== '0x') {
      return { status: Status.SUCCESS, error: '' };
    } else {
      return {
        status: Status.ERROR,
        error: 'This is the wallet address, not the contract address',
      };
    }
  };

  return useCallback(
    async (address: string) => {
      if (!address) {
        return initialState;
      }
      if (isAddress(address)) {
        return contractStatus(address);
      }
      return { status: Status.ERROR, error: 'Invalid contract address' };
    },
    [library],
  );
};
export default useIsContractAddress;
