export function progress(iteration, size) {
  const progressNumber = ((iteration + 1) / size) * 100;
  return Number(progressNumber.toFixed(2));
}
