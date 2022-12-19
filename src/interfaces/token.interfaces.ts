export interface TokenInfo {
  decimals: number;
  symbol: string;
  name: string;
  image: string;
}

export interface FullTokenInfo extends TokenInfo {
  address: string;
}
