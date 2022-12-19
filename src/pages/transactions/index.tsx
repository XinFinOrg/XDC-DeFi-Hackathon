import React, { useCallback, useEffect, useState } from 'react';
import { LabeledTextInput } from '../../components/Common/Inputs/TextInput';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { retry, RetryOptions } from '../../utils/retry';

const DEFAULT_RETRY_OPTIONS: RetryOptions = { n: 10, minWait: 0, maxWait: 0 };

const Transactions = () => {
  const [hash, setHash] = useState<string>('');
  const { chainId, library } = useActiveWeb3React();
  const getReceipt = useCallback(
    (hash: string) => {
      if (!library || !chainId) throw new Error('No library or chainId');
      return retry(() => {
        return library.getTransaction(hash).catch((e) => {
          console.error(e);
        });
      }, DEFAULT_RETRY_OPTIONS);
    },
    [chainId, library],
  );

  useEffect(() => {
    if (hash.length < 66 || !library) {
      return;
    }
    const { promise, cancel } = getReceipt(hash);
    promise
      .then((receipt) => {
        if (receipt) {
          console.log(receipt);
          receipt.wait().then((v) => {
            console.log(v);
          });
          // const payload = {
          //   chainId,
          //   hash,
          //   receipt: {
          //     blockHash: receipt.blockHash,
          //     blockNumber: receipt.blockNumber,
          //     contractAddress: receipt.contractAddress,
          //     from:
          //       receipt.from.substring(0, 3) === 'xdc'
          //         ? '0x' + receipt.from.substring(3)
          //         : receipt.from,
          //     status: receipt.status,
          //     to:
          //       receipt.to.substring(0, 3) === 'xdc' ? '0x' + receipt.to.substring(3) : receipt.to,
          //     transactionHash: receipt.transactionHash,
          //     transactionIndex: receipt.transactionIndex,
          //   },
          // };
          // console.log(payload);

          // the receipt was fetched before the block, fast-forward to that block to trigger balance updates
        } else {
          console.log('noreceip');
        }
      })
      .catch((error) => {
        if (!error.isCancelledError) {
          console.error(`Failed to check transaction hash: ${hash}`, error);
        }
      });
  }, [chainId, library, hash]);
  return (
    <>
      <LabeledTextInput
        wrapper={{ width: '100%', margin: '0 0 1rem 0' }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          /[^{x}a-fA-F0-9]/.test(e.target.value) || e.target.value.length > 66
            ? console.log(e.target.value)
            : setHash(e.target.value);
        }}
        label='Transaction hash'
        value={hash}
        name='txHash'
        placeholder='0x6148...93a4'
      />
    </>
  );
};

export default Transactions;
