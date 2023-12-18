import Queue from 'bull';

import config from '../../config/index.js';

export const notificationQueue = new Queue(`notification::${config.bot.API_TOKEN}`, {
  redis: config.db.redis,
});

export const analyticsQueue = new Queue(`analytics::${config.bot.API_TOKEN}`, {
  redis: config.db.redis,
});

export const advertisementsQueue = new Queue(`advertisements::${config.bot.API_TOKEN}`, {
  redis: config.db.redis,
});
