import { ChainId } from '../interfaces/connection-config.interface';

const { XDC_PROD, XDC_TEST, BSC_TEST, BSC_PROD, POLYGON_TEST } = ChainId;

export const MULTICALL_ADDRESS: { [chainId in ChainId]: string } = {
  [XDC_PROD]: '0x2aE7DcaF1e1AEf5Be1Ef63FCb0E70a519A4b8d7E',
  [XDC_TEST]: '0xdA0541ae853Ec682Edb79E6AB86DB963E3047e7a',
  [BSC_TEST]: '0x7B7b002b3B68935c234d99Abfeca40C6c8B312D1',
  [BSC_PROD]: '0x5dd3ae4bacfdff0022bbf6d04de44ef38287087c',
  [POLYGON_TEST]: '0x54eaaeec692655885de6d33cb1fb07bb8bba0723',
};

export const ATOMX_ADDRESS: { [chainId in ChainId]: string } = {
  [XDC_PROD]: '',
  [XDC_TEST]: '0xbEfe4b15E8b47cF40e983770a4Fa2a0ac5060fDC',
  [BSC_TEST]: '0xDE682b4AAa85171a15dB3fe39817db5f102Af677',
  [BSC_PROD]: '',
  [POLYGON_TEST]: '0xBF6265b4394237b03d1FCbb2e298942c183bfDdB',
};
