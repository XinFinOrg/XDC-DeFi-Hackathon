export const formattedNum = (number: any, usd = false) => {
  if (isNaN(number) || number === '' || number === undefined) {
    return usd ? '$0' : 0;
  }

  const num = parseFloat(number);

  if (num === 0) {
    if (usd) {
      return '$0';
    }
    return 0;
  }

  if (num < 0.0001 && num > 0) {
    return usd ? '< $0.0001' : '< 0.0001';
  }

  if (num > 1000) {
    return usd
      ? formatDollarAmount(num, 0)
      : Number(parseFloat(num.toString()).toFixed(0)).toLocaleString();
  }

  if (usd) {
    if (num < 0.1) {
      return formatDollarAmount(num, 5);
    } else {
      return formatDollarAmount(num, 2);
    }
  }

  return Number(parseFloat(num.toString()).toFixed(4)).toString();
};

export const formatDollarAmount = (num: number, digits: number) => {
  const formatter = new Intl.NumberFormat([], {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
  return formatter.format(num);
};
