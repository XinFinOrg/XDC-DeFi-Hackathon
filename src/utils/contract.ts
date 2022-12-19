import { AddressZero } from '@ethersproject/constants';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { Contract } from 'ethers';
import { isAddress } from 'ethers/lib/utils';
import ATOMX_ABI from '../constants/abis/AtomxER20.json';
import ERC20_ABI from '../constants/abis/erc20.json';
import MulticallABI from '../constants/abis/Multicall.json';
import { AtomxER20, Erc20, Multicall } from '../constants/abis/types';
import { ATOMX_ADDRESS, MULTICALL_ADDRESS } from '../constants/addresses';
import { ChainId } from '../interfaces/connection-config.interface';

export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(
  library: Web3Provider,
  account?: string,
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

export function getContract(
  address: string,
  ABI: any,
  library: Web3Provider,
  account?: string,
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return new Contract(address, ABI, getProviderOrSigner(library, account) as any);
}

export function getERC20Contract(library: Web3Provider, address: string, account?: string): Erc20 {
  return getContract(address, ERC20_ABI, library, account) as Erc20;
}

export function getMulticallContract(library: Web3Provider, chainId: ChainId): Multicall {
  return getContract(MULTICALL_ADDRESS[chainId], MulticallABI, library) as Multicall;
}

export function getAtomxContract(
  library: Web3Provider,
  chainId: ChainId,
  account?: string,
): AtomxER20 {
  return getContract(ATOMX_ADDRESS[chainId], ATOMX_ABI.abi, library, account) as AtomxER20;
}
