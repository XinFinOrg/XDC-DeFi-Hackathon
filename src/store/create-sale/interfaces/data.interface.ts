import { BigNumber } from 'ethers';

export interface IERC20DataCreatePresale {
  symbol: string;
  name: string;
  decimals: number;
  balance: string;
  allowance: string;
  totalSupply: string;
}

export interface IERC20DataCreatePresaleBN
  extends Omit<IERC20DataCreatePresale, 'totalSupply' | 'balance'> {
  totalSupply: BigNumber;
  balance: BigNumber;
}

export interface ICreateSaleData {
  tokenAddress: string;
  tokenAddressIsValid: boolean;
  presaleRate: string;
  softCap: string;
  hardCap: string;
  minContributionLimits: string;
  maxContributionLimits: string;
  dexLiquidity: number;
  dexListingRate: string;
  logo: string;
  website: string;
  github: string;
  twitter: string;
  reddit: string;
  telegram: string;
  discord: string;
  linkAudit: string;
  description: string;
  presaleStart: string;
  presaleEnd: string;
  liquidityLockupTime: string;
  tokenData: IERC20DataCreatePresale;
}

export interface ICreateSaleDataBN
  extends Omit<
    ICreateSaleData,
    | 'presaleRate'
    | 'dexListingRate'
    | 'tokenData'
    | 'softCap'
    | 'hardCap'
    | 'minContributionLimits'
    | 'maxContributionLimits'
  > {
  presaleRate: BigNumber;
  dexListingRate: BigNumber;
  totalTokensRequired: BigNumber;
  tokenData: IERC20DataCreatePresaleBN;
  softCap: BigNumber;
  hardCap: BigNumber;
  minContributionLimits: BigNumber;
  maxContributionLimits: BigNumber;
}
