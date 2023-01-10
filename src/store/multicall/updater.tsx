import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { useMulticallContract } from '../../hooks/useContract';
import { useBlockNumber } from '../application/hooks';
import { multicall } from './instance';

// Create Updater wrappers that pull needed info from store
export default function Updater() {
  const latestBlockNumber = useBlockNumber();
  const { chainId } = useActiveWeb3React();
  const multicallContract = useMulticallContract();
  return (
    <multicall.Updater
      chainId={chainId}
      latestBlockNumber={latestBlockNumber}
      contract={multicallContract}
    />
  );
}
