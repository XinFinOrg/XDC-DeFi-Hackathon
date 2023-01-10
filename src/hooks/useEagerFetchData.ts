import { useEffect } from 'react';
import { Status } from '../interfaces/statuses';
import { useAppDispatch } from '../store';
import { fetchSelectedTheme } from '../store/ui';
import { useUIStateStatus } from '../store/ui/hooks';

const useEagerFetchData = () => {
  const dispatch = useAppDispatch();
  const uiStatus = useUIStateStatus();

  useEffect(() => {
    if (uiStatus === Status.INITIAL) {
      dispatch(fetchSelectedTheme() as any);
    }
  }, [uiStatus, dispatch]);
};

export default useEagerFetchData;
