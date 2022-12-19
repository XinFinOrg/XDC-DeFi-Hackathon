import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';

export function formatPrice(value: BigNumber, afterDot = 3, decimals = 18): string {
  return removeLastZeros(formatUnits(value, decimals), afterDot);
}

export function removeLastZeros(v: string | number, afterDot: number): string {
  let value: string;
  if (typeof v === 'number') {
    value = v.toString();
  } else {
    value = v;
  }
  let index;
  if (value.includes('.')) {
    const indexOfDot = value.indexOf('.');

    value = value.substring(0, indexOfDot + afterDot + 1);
    index = value.length;
    for (let i = value.length - 1; i > 0; i--) {
      if (value[i] !== '0') {
        break;
      }
      index--;
    }
    if (value[index - 1] === '.') {
      index--;
    }
  }

  return value.substring(0, index);
}
