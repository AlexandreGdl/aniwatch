export function goBack() {
  history.back();
}

export function convertDurationToMinuteAndSecond(time: number): {seconds: number; minutes: number} {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return {seconds, minutes};
}

export function prettyMinute(minutes: number, seconds: number) {
  function str_pad_left(time: number, pad: string, length: number) {
    return (new Array(length + 1).join(pad) + time).slice(-length);
  }

  return str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2);
}

export function makePercentageString(num: number) {
  return `${num.toFixed(2)}%`;
}

export function makePercentage(num: number) {
  return Number(Math.max(0, Math.min(num, 100)).toFixed(2));
}