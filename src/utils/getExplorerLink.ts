import { ChainId } from '../interfaces/connection-config.interface';

const ETHERSCAN_PREFIXES: { [chainId: number]: string } = {
  [ChainId.XDC_PROD]: 'explorer.xinfin.',
  [ChainId.XDC_TEST]: 'explorer.apothem.',
};

export enum ExplorerDataType {
  TRANSACTION = 'transaction',
  TOKEN = 'token',
  ADDRESS = 'address',
  BLOCK = 'block',
}

/**
 * Return the explorer link for the given data and data type
 * @param chainId the ID of the chain for which to return the data
 * @param data the data to return a link for
 * @param type the type of the data
 */
export function getExplorerLink(chainId: number, data: string, type: ExplorerDataType): string {
  const prefix = `https://${ETHERSCAN_PREFIXES[chainId] ?? ''}network`;

  switch (type) {
    case ExplorerDataType.TRANSACTION:
      return `${prefix}/txs/${data}`;

    case ExplorerDataType.TOKEN:
      return `${prefix}/tokens/${data}`;

    case ExplorerDataType.BLOCK:
      return `${prefix}/blocks/${data}`;

    case ExplorerDataType.ADDRESS:
      return `${prefix}/address/${data}`;
    default:
      return `${prefix}`;
  }
}
