import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { NetworkContextName } from '../constants/misc';

export class XDCWeb3Provider extends Web3Provider {
  formatXDCAddress(address: string) {
    if (!address.startsWith('xdc')) return address;

    return '0x' + address.substring(3);
  }

  async perform(method: string, params: any) {
    const result = await super.perform(method, params);

    if (!result) return result;

    if (result.from) result.from = this.formatXDCAddress(result.from);
    if (result.to) result.to = this.formatXDCAddress(result.to);

    switch (method) {
      case 'getTransactionReceipt': {
        if (result.logs)
          result.logs = result.logs.map((log: any) => {
            log.address = this.formatXDCAddress(log.address);
            return log;
          });
      }
    }

    return result;
  }
}

const useActiveWeb3React = (): Web3ReactContextInterface<Web3Provider> => {
  // const { library, chainId, ...web3React } = useWeb3React<XDCWeb3Provider>();
  //
  // const simpleRpcProvider = useMemo(() => {
  //   if (chainId === undefined) {
  //     return new ethers.providers.JsonRpcProvider(networksConfig[ChainId.XDC_PROD].rpcUrls[0]);
  //   }
  //   return new ethers.providers.JsonRpcProvider(networksConfig[chainId as ChainId].rpcUrls[0]);
  // }, [chainId]);
  //
  // const [provider, setProvider] = useState(library || simpleRpcProvider);
  //
  // const refEth = useRef(library);
  //
  // useEffect(() => {
  //   if (library && !library.formatXDCAddress) {
  //     setProvider(new XDCWeb3Provider(library.provider, library.network));
  //     return;
  //   }
  //
  //   if (library !== refEth.current) {
  //     setProvider(library || simpleRpcProvider);
  //     refEth.current = library;
  //   }
  // }, [library]);
  //
  // return {
  //   library: provider as Web3Provider,
  //   ...web3React,
  // };
  const context = useWeb3React<XDCWeb3Provider>();
  const contextNetwork = useWeb3React<Web3Provider>(NetworkContextName);

  if (context.library && !context.library.formatXDCAddress) {
    context.library = new XDCWeb3Provider(context.library.provider, context.library.network);
  }

  return context.active ? context : contextNetwork;
};
export default useActiveWeb3React;
