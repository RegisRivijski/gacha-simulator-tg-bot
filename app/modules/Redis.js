import { createClient } from 'redis';

const client = createClient();

client.on('open', () => {
  console.info('Successfully connected to Redis.');
});

client.on('error', (e) => {
  throw new Error(`Redis Client Error: ${e.message}.`);
});

export default client;
