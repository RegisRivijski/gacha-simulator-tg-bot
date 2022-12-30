import { createClient } from 'redis';

const client = createClient();

client.on('open', () => {
  console.info('Successfully connected to Redis.');
});

export default client;
