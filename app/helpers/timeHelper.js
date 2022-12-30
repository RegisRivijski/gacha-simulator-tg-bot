export function howManyMinutesPast(time) {
  return Math.floor(((new Date()).getTime() - time) / 60000);
}
