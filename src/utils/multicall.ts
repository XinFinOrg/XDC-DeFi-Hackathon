import { Interface } from '@ethersproject/abi';
import { Web3Provider } from '@ethersproject/providers';
import { CallOverrides } from 'ethers';
import { ChainId } from '../interfaces/connection-config.interface';
import { getMulticallContract } from './contract';

export interface Call {
  address: string; // Address of the contract
  name: string; // Function name on the contract (example: balanceOf)
  params?: any[]; // Function params
}

export interface MulticallOptions extends CallOverrides {
  requireSuccess?: boolean;
}

export const multicall = async <T extends any[]>(
  abi: any[],
  calls: Call[],
  library: Web3Provider,
  chainId: ChainId = ChainId.XDC_PROD,
): Promise<T> => {
  const multi = getMulticallContract(library, chainId);
  const itf = new Interface(abi);

  const calldata = calls.map((call) => ({
    target: call.address.toLowerCase(),
    callData: itf.encodeFunctionData(call.name, call.params),
    gasLimit: 5_000_000,
  }));
  const { returnData } = await multi.multicall(calldata);

  const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call.returnData));

  return res as T;
};

export const singleAddressNoParamsMulticall = <T extends any[]>(
  abi: any[],
  address: string,
  methodNames: string[],
  library: Web3Provider,
  chainId?: ChainId,
): Promise<T> =>
  multicall<T>(
    abi,
    methodNames.map((method) => ({ address, name: method })),
    library,
    chainId,
  );
