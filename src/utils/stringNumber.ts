export function floorStringNumber(num: string, rounding: number) {
  const splittedNum = num.split('.');
  if (!splittedNum[1]) return num;

  return splittedNum[0] + '.' + splittedNum[1].substring(0, rounding);
}
