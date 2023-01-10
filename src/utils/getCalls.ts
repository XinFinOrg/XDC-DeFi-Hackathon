import { Call } from './multicall';

export const getCallsForTokenInfo = (tokenAddress: string, lockerAddress?: string): Call[] => {
  const calls: Call[] = [
    {
      address: tokenAddress,
      name: 'name',
    },
    {
      address: tokenAddress,
      name: 'symbol',
    },
    {
      address: tokenAddress,
      name: 'decimals',
    },
  ];
  if (lockerAddress) {
    calls.push({
      address: tokenAddress,
      name: 'balanceOf',
      params: [lockerAddress],
    });
  }
  return calls;
};

export const getCallsForLpTokenInfo = (tokenAddress: string, lockerAddress: string): Call[] => {
  return [
    {
      address: tokenAddress,
      name: 'name',
    },
    {
      address: tokenAddress,
      name: 'symbol',
    },
    {
      address: tokenAddress,
      name: 'decimals',
    },
    {
      address: tokenAddress,
      name: 'balanceOf',
      params: [lockerAddress],
    },
    {
      address: tokenAddress,
      name: 'token0',
    },
    {
      address: tokenAddress,
      name: 'token1',
    },
  ];
};
