export function getFormattedTime(date: Date): string;
export function getFormattedTime(millisecs: number): string;
export function getFormattedTime(param1: unknown) {
  let seconds;
  let minutes;
  let hours;
  let days;

  switch (typeof param1) {
    case 'number': {
      const millisecs = param1 as number;

      const mathRound = millisecs > 0 ? Math.floor : (num: number) => Math.abs(Math.ceil(num));

      seconds = mathRound((millisecs / 1000) % 60);
      minutes = mathRound((millisecs / 1000 / 60) % 60);
      hours = mathRound((millisecs / 1000 / 60 / 60) % 24);
      days = millisecs / 1000 / 60 / 60 / 24;

      if (Math.abs(days) > 999) {
        days = Math.sign(days) * 999;
      } else {
        days = Math.sign(days) * mathRound(days);
      }

      break;
    }
    case 'object': {
      const date = param1 as Date;

      seconds = date.getSeconds();
      minutes = date.getMinutes();
      hours = date.getHours();
      days = date.getDay();
      break;
    }
    default: {
      seconds = '0';
      minutes = '0';
      hours = '0';
      days = '0';
    }
  }

  // Will display time in 10d 30h 23m 33s format
  return (
    (days ? days + 'd ' : '') +
    (days || hours ? hours + 'h ' : '') +
    (days || hours || minutes ? minutes + 'm ' : '') +
    (seconds ? seconds + 's' : '')
  );
}

export const now = () => new Date().getTime();
