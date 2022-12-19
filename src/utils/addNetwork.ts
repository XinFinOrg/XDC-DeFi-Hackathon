import { BigNumber } from '@ethersproject/bignumber';
import { hexStripZeros } from '@ethersproject/bytes';
import { Web3Provider } from '@ethersproject/providers';
import { L1ChainInfo } from '../constants/chains';
import { ChainId } from '../interfaces/connection-config.interface';

interface AddNetworkArguments {
  library: Web3Provider;
  chainId: ChainId;
  info: L1ChainInfo;
}

// provider.request returns Promise<any>, but wallet_switchEthereumChain must return null or throw
// see https://github.com/rekmarks/EIPs/blob/3326-create/EIPS/eip-3326.md for more info on wallet_switchEthereumChain
export async function addNetwork({
  library,
  chainId,
  info,
}: AddNetworkArguments): Promise<null | void> {
  if (!library?.provider?.request) {
    return;
  }
  const formattedChainId = hexStripZeros(BigNumber.from(chainId).toHexString());
  try {
    await library?.provider.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: formattedChainId,
          chainName: info.label,
          rpcUrls: info.rpcUrls,
          nativeCurrency: info.nativeCurrency,
          blockExplorerUrls: [info.explorer],
        },
      ],
    });
  } catch (error) {
    console.error('error adding eth network: ', chainId, info, error);
  }
}
