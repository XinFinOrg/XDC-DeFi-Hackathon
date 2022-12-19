import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '..';

export const useSwapSelectedNetwork = (): { from: number; to: number } => {
  return useSelector((state: AppState) => state.swaps.selectedNetworks);
};

export const useSelectedNetworksForUpdater = (): null => {
  const selectedNetworks = useSwapSelectedNetwork();
  useEffect(() => {
    console.log('erlaaaaaaaaaaaaaaaaaaaaaan');
  }, [selectedNetworks]);
  return null;
};
