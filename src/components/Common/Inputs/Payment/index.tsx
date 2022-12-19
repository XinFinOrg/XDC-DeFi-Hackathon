import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { useEffect, useState } from 'react';
import useActiveWeb3React from '../../../../hooks/useActiveWeb3React';
import { useConnectionConfig } from '../../../../hooks/useConnectionConfig';
import { IContract } from '../../../../interfaces/connection-config.interface';
import { useIsXTT } from '../../../../store/payment/hooks';
import { BIG_ZERO } from '../../../../utils/bigNumber';
import { Call, multicall } from '../../../../utils/multicall';
import { DividerLine } from '../../Divider';
import { Flex } from '../../Flex';
import { Span } from '../../Span';
import PaymentToggle from './PaymentToggle';
import PaymentTooltip, { PaymentTooltipWrapper } from './PaymentTooltip';

interface Props {
  discount?: number; // %
  contract: IContract;
  getXdcFee?: (xdcFee: BigNumber) => void;
  getFreeAccessAmount?: (amount: number) => void;
  withFreeAccess?: boolean;
}

export const Payment = ({
  discount,
  contract,
  getXdcFee,
  getFreeAccessAmount,
  withFreeAccess = true,
}: Props) => {
  const isXTT = useIsXTT();
  const { account, library, chainId } = useActiveWeb3React();
  const [xdcFee, setXdcFee] = useState<BigNumber>(BIG_ZERO);
  const [freeAccessAmount, setFreeAccessAmount] = useState(0);
  const { nativeCurrency } = useConnectionConfig();

  useEffect(() => {
    if (!library) return;

    const calls: Call[] = [
      {
        address: contract.address,
        name: 'fee',
        params: [],
      },
      {
        address: contract.address,
        name: 'feeInTokens',
        params: [],
      },
    ];

    multicall<[[BigNumber], [BigNumber], [BigNumber]]>(contract.abi, calls, library, chainId)
      .then((value) => {
        if (account && withFreeAccess && Number(value[2][0]) > 0) {
          setXdcFee(BIG_ZERO);
          setFreeAccessAmount(Number(value[2][0].toString()));
          return;
        }

        setXdcFee(value[0][0]);
      })
      .catch((e) => {
        console.error('Error while getting generate data:\n', e);
      });
  }, [chainId, library, account, isXTT, contract]);

  useEffect(() => {
    getXdcFee && getXdcFee(xdcFee);
    getFreeAccessAmount && getFreeAccessAmount(freeAccessAmount);
  }, [xdcFee, freeAccessAmount]);

  return (
    <>
      <Flex flexDirection='column' gap='0.8rem' align='flex-start'>
        <h2>
          Payment type
          <PaymentTooltipWrapper>
            <PaymentTooltip discount={discount} />
          </PaymentTooltipWrapper>
          :
        </h2>
        <PaymentToggle discount={discount} hideTooltip />
      </Flex>

      <DividerLine margin='0.5rem 0 0' />
      <Flex flexDirection='column' gap='0.8rem' align='flex-start'>
        {freeAccessAmount > 0 ? (
          <>
            <h2>Free access amount:</h2>
            <Span>{freeAccessAmount}</Span>
          </>
        ) : (
          <>
            <h2>Price:</h2>
            <Span>{isXTT ? `~ OLD` : `${formatUnits(xdcFee)} ${nativeCurrency.symbol}`}</Span>
          </>
        )}
      </Flex>
    </>
  );
};
