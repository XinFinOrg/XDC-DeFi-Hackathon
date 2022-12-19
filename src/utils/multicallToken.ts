import { BigNumber } from '@ethersproject/bignumber';
import { Web3Provider } from '@ethersproject/providers';
import { formatUnits } from '@ethersproject/units';
import { burnAddresses } from '../constants';
import ERC20_ABI from '../constants/abis/erc20.json';
import { ChainId } from '../interfaces/connection-config.interface';
import { Call, multicall } from './multicall';

export const noParamsMethods = ['name', 'symbol', 'decimals', 'totalSupply'];

function getCalls(tokenAddress: string, account?: string, spender?: string): Call[] {
  const calls: Call[] = noParamsMethods.map((method) => ({
    address: tokenAddress,
    name: method,
  }));
  const burnCalls: Call[] = burnAddresses.map((burn) => ({
    address: tokenAddress,
    name: 'balanceOf',
    params: [burn],
  }));
  calls.push(...burnCalls);

  if (account) {
    calls.push({
      address: tokenAddress,
      name: 'balanceOf',
      params: [account],
    });
  }

  if (account && spender) {
    calls.push({
      address: tokenAddress,
      name: 'allowance',
      params: [account, spender],
    });
  }

  return calls;
}

export interface NoParamsTokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: number;
}
export interface BurnedTokenInfo extends NoParamsTokenInfo {
  burned: BigNumber;
}
export interface AccountTokenInfo extends BurnedTokenInfo {
  balance: BigNumber;
}
export interface SpenderTokenInfo extends AccountTokenInfo {
  allowance: BigNumber;
}

export async function multicallToken(
  library: Web3Provider,
  chainId: ChainId | undefined,
  tokenAddress: string,
): Promise<NoParamsTokenInfo>;
export async function multicallToken(
  library: Web3Provider,
  chainId: ChainId | undefined,
  tokenAddress: string,
  burned: boolean,
): Promise<BurnedTokenInfo>;
export async function multicallToken(
  library: Web3Provider,
  chainId: ChainId | undefined,
  tokenAddress: string,
  burned: boolean,
  account: string,
): Promise<AccountTokenInfo>;
export async function multicallToken(
  library: Web3Provider,
  chainId: ChainId | undefined,
  tokenAddress: string,
  burned: boolean,
  account: string,
  spender: string,
): Promise<SpenderTokenInfo>;
export async function multicallToken(
  library: Web3Provider,
  chainId: ChainId | undefined,
  tokenAddress: string,
  burned?: boolean,
  account?: string,
  spender?: string,
) {
  const calls = getCalls(tokenAddress, account, spender);

  const response = await multicall<
    [[string], [string], [number], [BigNumber], [BigNumber], [BigNumber], [BigNumber], [BigNumber]]
  >(ERC20_ABI, calls, library, chainId);
  const [[name], [symbol], [decimals], [totalSupply]] = response;

  const result: any = {
    name,
    symbol,
    decimals,
    totalSupply,
  };
  if (response[4] && response[5]) {
    result['burned'] = response[4][0].add(response[5][0]);
  }
  if (response[6]) {
    result['balance'] = response[6][0];
  }

  if (response[7]) {
    result['allowance'] = response[7][0];
  }
  return result;
}

export async function multicallTokenArray(
  library: Web3Provider,
  chainId: ChainId | undefined,
  tokenAddresses: string[],
): Promise<NoParamsTokenInfo[]>;
export async function multicallTokenArray(
  library: Web3Provider,
  chainId: ChainId | undefined,
  tokenAddresses: string[],
  account: string,
): Promise<AccountTokenInfo[]>;
export async function multicallTokenArray(
  library: Web3Provider,
  chainId: ChainId | undefined,
  tokenAddresses: string[],
  account: string,
  spender: string,
): Promise<SpenderTokenInfo[]>;
export async function multicallTokenArray(
  library: Web3Provider,
  chainId: ChainId | undefined,
  tokenAddresses: string[],
  account?: string,
  spender?: string,
) {
  const calls: Call[] = [];
  tokenAddresses.forEach((address) => {
    calls.push(...getCalls(address, account, spender));
  });

  const response = await multicall(ERC20_ABI, calls, library, chainId);

  let resultFieldsCount = 6; //4 no params + 2 burn addresses
  if (account) {
    resultFieldsCount += 1;

    if (spender) resultFieldsCount += 1;
  }

  const result = [];
  for (let i = 0; i < tokenAddresses.length; i += 1) {
    const singleTokenResponse = response.slice(i * resultFieldsCount, (i + 1) * resultFieldsCount);

    const [[name], [symbol], [decimals], [totalSupplyBN], [burn1], [burn2]] = singleTokenResponse;

    result.push({
      name,
      symbol,
      decimals,
      totalSupply: Number(formatUnits(totalSupplyBN, decimals)),
      burned: burn1.add(burn2),
      balance: singleTokenResponse[6] ? singleTokenResponse[6][0] : singleTokenResponse[6],
      allowance: singleTokenResponse[7] ? singleTokenResponse[7][0] : singleTokenResponse[7],
    });
  }

  return result;
}
