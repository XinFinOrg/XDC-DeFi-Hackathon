import { ChainId } from '../interfaces/connection-config.interface';

export const getChainedAddress = (address: { [chainId in ChainId]: string }, chainId?: ChainId) => {
  if (chainId) {
    return address[chainId];
  }
  return address[ChainId.XDC_PROD];
};
