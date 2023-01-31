export function cleanObject(object) {
  for (const key of Object.keys(object)) {
    if (!object[key]) {
      // eslint-disable-next-line no-param-reassign
      delete object[key];
    }
  }
  return object;
}
