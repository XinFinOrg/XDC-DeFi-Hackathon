import { parseUnits } from '@ethersproject/units';
import { useSelector } from 'react-redux';
import { DECIMALS_BIG_18 } from '../../utils/bigNumber';
import { AppState } from '../index';
import { ICreateSaleData, ICreateSaleDataBN } from './interfaces/data.interface';

export const useCreateSaleData = (): ICreateSaleData => {
  return useSelector((state: AppState) => state.createSale);
};

export const useCreateSaleDataBN = (): ICreateSaleDataBN => {
  return useSelector(({ createSale }: AppState) => {
    const presaleRate = parseUnits(createSale.presaleRate || '0', createSale.tokenData.decimals);
    const dexListingRate = parseUnits(
      createSale.dexListingRate || '0',
      createSale.tokenData.decimals,
    );
    const hardCap = parseUnits(createSale.hardCap || '0', 18);
    const softCap = parseUnits(createSale.softCap || '0', 18);
    return {
      ...createSale,
      presaleRate,
      dexListingRate,
      minContributionLimits: parseUnits(createSale.minContributionLimits || '0', 18),
      maxContributionLimits: parseUnits(createSale.maxContributionLimits || '0', 18),
      softCap,
      hardCap,
      totalTokensRequired: presaleRate
        .mul(hardCap)
        .add(
          dexListingRate
            .mul(hardCap)
            .mul(createSale.dexLiquidity || '0')
            .div(100),
        )
        .div(DECIMALS_BIG_18),
      tokenData: {
        ...createSale.tokenData,
        totalSupply: parseUnits(createSale.tokenData.totalSupply || '0', 0),
        balance: parseUnits(createSale.tokenData.balance || '0', 0),
      },
    };
  });
};
