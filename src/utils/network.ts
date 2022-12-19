import { ChainId, ENetworkType } from '../interfaces/connection-config.interface';

const prodIds: { [key in ChainId]?: boolean } = {
  [ChainId.XDC_PROD]: true,
  [ChainId.BSC_PROD]: true,
};

export const getNetworkType = (chainId: ChainId): ENetworkType => {
  return prodIds[chainId] ? ENetworkType.PROD : ENetworkType.TEST;
};
