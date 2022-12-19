import { ChainId } from '../interfaces/connection-config.interface';
import { CHAIN_INFO } from './chains';

export const getChainSymbol = (chainId: number | undefined) =>
  chainId
    ? CHAIN_INFO[chainId as ChainId].nativeCurrency.symbol
    : CHAIN_INFO[ChainId.XDC_PROD].nativeCurrency.symbol;
