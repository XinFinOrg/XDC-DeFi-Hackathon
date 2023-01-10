import { ChainId } from '../interfaces/connection-config.interface';
// todo: ChainId.XDC_PROD, for prod

export const ALL_SUPPORTED_CHAIN_IDS: ChainId[] = [ChainId.XDC_TEST, ChainId.POLYGON_TEST];

export const L1_CHAIN_IDS = [ChainId.XDC_TEST] as const;

export type SupportedL1ChainId = typeof L1_CHAIN_IDS[number];

export interface L1ChainInfo {
  readonly blockWaitMsBeforeWarning?: number;
  readonly docs: string;
  readonly explorer: string;
  readonly infoLink: string;
  readonly label: string;
  readonly logoUrl: string;
  readonly rpcUrls: string[];
  readonly chainId: ChainId;
  readonly nativeCurrency: {
    name: string; // 'Goerli ETH',
    symbol: string; // 'gorETH',
    decimals: number; //18,
  };
}

export type ChainInfo = { readonly [chainId: number]: L1ChainInfo } & {
  readonly [chainId in SupportedL1ChainId]: L1ChainInfo;
};

const { XDC_PROD, XDC_TEST, BSC_TEST, BSC_PROD, POLYGON_TEST } = ChainId;

export const TOKEN_LIST_REPO: { [key in ChainId]: string } = {
  [XDC_TEST]: 'https://raw.githubusercontent.com/pro100skm/xdc-token-list/master',
  [XDC_PROD]: 'https://raw.githubusercontent.com/pro100skm/xdc-token-list/master',
  [BSC_TEST]: '',
  [BSC_PROD]: '',
  [POLYGON_TEST]: '',
};

export const CHAIN_INFO: ChainInfo = {
  [XDC_PROD]: {
    docs: 'https://howto.xinfin.org/',
    explorer: 'https://explorer.xinfin.network',
    infoLink: 'https://xinfin.network/',
    label: 'XDC Mainnet',
    logoUrl: `${TOKEN_LIST_REPO[XDC_PROD]}/xdc-logo.png`,
    rpcUrls: ['/rpc-xdc-mainnet', 'https://erpc.xinfin.network'],
    chainId: XDC_PROD,
    nativeCurrency: {
      name: 'XDC',
      symbol: 'XDC',
      decimals: 18,
    },
  },
  [XDC_TEST]: {
    docs: 'https://howto.xinfin.org/',
    explorer: 'https://explorer.apothem.network',
    infoLink: 'https://xinfin.network/',
    label: 'XDC Testnet',
    logoUrl: `${TOKEN_LIST_REPO[XDC_TEST]}/xdc-logo-test.png`,
    rpcUrls: ['/rpc-xdc-testnet', 'https://rpc.apothem.network'],
    chainId: XDC_TEST,
    nativeCurrency: {
      name: 'XDC',
      symbol: 'XDC',
      decimals: 18,
    },
  },
  [BSC_PROD]: {
    docs: '',
    explorer: 'https://bscscan.com/',
    infoLink: 'https://bscscan.com/',
    label: 'BSC Mainnet',
    logoUrl: 'https://bscscan.com/images/svg/brands/bnb.svg',
    rpcUrls: ['/rpc-bsc-mainnet', 'https://bsc-dataseed1.binance.org'],
    chainId: BSC_PROD,
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
  },
  [BSC_TEST]: {
    docs: '',
    explorer: 'https://testnet.bscscan.com/',
    infoLink: 'https://bscscan.com/',
    label: 'BSC Testnet',
    logoUrl: 'https://bscscan.com/images/svg/brands/bnb.svg',
    rpcUrls: ['/rpc-bsc-testnet', 'https://data-seed-prebsc-1-s1.binance.org:8545'],
    chainId: BSC_TEST,
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
  },
  [POLYGON_TEST]: {
    docs: '',
    explorer: '',
    infoLink: '',
    label: 'Polygon Testnet',
    logoUrl:
      'https://europe1.discourse-cdn.com/business20/uploads/polygon1/original/1X/9a8958e80d8390e320481495ad9837b2fa194861.png',
    rpcUrls: ['/rpc-polygon-testnet', 'https://matic-mumbai.chainstacklabs.com'],
    chainId: POLYGON_TEST,
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
};
