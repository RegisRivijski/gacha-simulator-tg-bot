import { createClient } from 'redis';

import config from '../../config/index.js';

const client = createClient(config.db.redis);

client.on('open', () => {
  console.info('Successfully connected to Redis.');
});

export default client;
