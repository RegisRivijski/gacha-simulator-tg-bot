import { createClient } from 'redis';

import config from '../../config/index.js';

export const client = createClient(config.db.redis);
