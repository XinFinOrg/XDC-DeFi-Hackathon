import { useEffect, useMemo } from 'react';
import { useAppDispatch } from '..';
import { markDoneCallbackInfos } from './actions';
import { useAllTransactions, useCallbackInfos } from './hooks';
import { CallbackInfo } from './reducer';

export default function CallbackUpdater(): null {
  const callbackInfos = useCallbackInfos();
  const allTransactions = useAllTransactions();
  const dispatch = useAppDispatch();

  const confirmedCallbackInfos: CallbackInfo[] = useMemo(() => {
    if (!callbackInfos?.length) return [];

    return callbackInfos.filter((info) => !!allTransactions[info.hash]?.receipt);
  }, [callbackInfos, allTransactions]);

  useEffect(() => {
    if (!confirmedCallbackInfos.length) return;

    confirmedCallbackInfos.forEach((confirmedCallback) => {
      try {
        confirmedCallback.func();
      } catch (e) {
        console.error(e);
      }
    });

    dispatch(markDoneCallbackInfos(confirmedCallbackInfos.map((v) => v.hash)));
  }, [confirmedCallbackInfos]);

  return null;
}
