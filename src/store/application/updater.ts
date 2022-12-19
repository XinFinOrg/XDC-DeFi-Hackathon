import { useCallback, useEffect, useState } from 'react';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import useDebounce from '../../hooks/useDebounce';
import useIsWindowVisible from '../../hooks/useIsWindowVisible';
import { supportedChainId } from '../../utils/supportedChainId';
import { switchToNetwork } from '../../utils/switchToNetwork';
import { useAppDispatch, useAppSelector } from '../index';
import { setImplements3085, updateBlockNumber, updateChainId } from './reducer';

export default function Updater(): null {
  const { account, chainId, library } = useActiveWeb3React();
  const dispatch = useAppDispatch();
  const windowVisible = useIsWindowVisible();

  const [state, setState] = useState<{ chainId: number | undefined; blockNumber: number | null }>({
    chainId,
    blockNumber: null,
  });

  const blockNumberCallback = useCallback(
    (blockNumber: number) => {
      setState((state) => {
        if (chainId === state.chainId) {
          if (typeof state.blockNumber !== 'number') return { chainId, blockNumber };
          return { chainId, blockNumber: Math.max(blockNumber, state.blockNumber) };
        }
        return state;
      });
    },
    [chainId, setState],
  );

  // attach/detach listeners
  useEffect(() => {
    if (!library || !chainId || !windowVisible) return undefined;

    setState({ chainId, blockNumber: null });

    library
      .getBlockNumber()
      .then(blockNumberCallback)
      .catch((error) => console.error(`Failed to get block number for chainId: ${chainId}`, error));

    library.on('block', blockNumberCallback);
    return () => {
      library.removeListener('block', blockNumberCallback);
    };
  }, [dispatch, chainId, library, blockNumberCallback, windowVisible]);

  const debouncedState = useDebounce(state, 100);

  useEffect(() => {
    if (!debouncedState.chainId || !debouncedState.blockNumber || !windowVisible) return;
    dispatch(
      updateBlockNumber({
        chainId: debouncedState.chainId,
        blockNumber: debouncedState.blockNumber,
      }),
    );
  }, [windowVisible, dispatch, debouncedState.blockNumber, debouncedState.chainId]);

  useEffect(() => {
    dispatch(
      updateChainId({
        chainId: debouncedState.chainId ? supportedChainId(debouncedState.chainId) ?? null : null,
      }),
    );
  }, [dispatch, debouncedState.chainId]);

  const implements3085 = useAppSelector((state) => state.application.implements3085);

  useEffect(() => {
    if (!library?.provider?.request) {
      dispatch(setImplements3085({ implements3085: false }));
    } else if (account && !implements3085) {
      switchToNetwork({ library })
        .then((x) => x ?? dispatch(setImplements3085({ implements3085: true })))
        .catch(() => dispatch(setImplements3085({ implements3085: false })));
    } else if (!account && implements3085) {
      dispatch(setImplements3085({ implements3085: false }));
    }
  }, [account, dispatch, implements3085, library]);

  return null;
}
