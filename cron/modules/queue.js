import Queue from 'bull';

import config from '../../config/index.js';

export const queue = new Queue(config.bot.API_TOKEN, {
  redis: config.db.redis,
});
