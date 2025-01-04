import { client } from '../modules/redis.js';

export default function createCachedWrapper(databaseObject, cacheTimeInSeconds) {
  const cachedObject = {};

  for (const methodName in databaseObject) {
    if (typeof databaseObject[methodName] === 'function') {
      cachedObject[methodName] = async function (...args) {
        const cacheKey = JSON.stringify({ method: methodName, args });

        const cachedData = await client.get(cacheKey);

        if (cachedData) {
          return JSON.parse(cachedData);
        }

        const result = await databaseObject[methodName](...args);

        await client.setEx(cacheKey, cacheTimeInSeconds, JSON.stringify(result));

        return result;
      };
    }
  }

  return cachedObject;
}
