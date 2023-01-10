import { ISelectedNetworks } from '../store/swaps/interfaces/data.interface';
import { ChainId } from '../interfaces/connection-config.interface';

export const MAX_UINT256 =
  '115792089237316195423570985008687907853269984665640564039457584007913129639935';

export const BLOCKED_ADDRESSES: string[] = ['0x7F367cC41522cE07553e823bf3be79A889DEbe1B'];

export const zeroAddress = '0x0000000000000000000000000000000000000000';

export const burnAddresses: string[] = [zeroAddress, '0x000000000000000000000000000000000000dEaD'];

export const connectorLocalStorageKey = 'connectorId';
export const walletLocalStorageKey = 'wallet';

export const APP_NAME = 'AtomX';

export const initialSelectedNetworks: ISelectedNetworks = {
  initiator: ChainId.XDC_TEST,
  replier: ChainId.BSC_TEST,
};
