import config from '../../config/index.js';
import Redis from '../classes/Redis.js';

import {
  MESSAGE_RATE_LIMIT_TTL,
  BANNER_RATE_LIMIT_TTL,
} from '../constants/index.js';

import { getUserData } from '../helpers/telegraf.js';

const redis = new Redis(config.db.redis);

export async function commandRateLimiter(ctx, next) {
  const {
    chatId,
    groupChatId,
  } = getUserData(ctx);

  const key = `message_${chatId}_${groupChatId}`;
  const rateLimit = await redis.get(key);

  if (!rateLimit) {
    const currentDate = String(new Date().getTime());
    await redis.set(key, currentDate, {
      EX: MESSAGE_RATE_LIMIT_TTL,
    });
    await next();
  }
}

export async function wishRateLimiter(ctx, next) {
  const {
    chatId,
    groupChatId,
  } = getUserData(ctx);

  const key = `spin_${chatId}_${groupChatId}`;
  const isSpin = await redis.get(key);

  if (!isSpin) {
    const currentDate = String(new Date().getTime());

    await redis.set(key, currentDate, {
      EX: BANNER_RATE_LIMIT_TTL,
    });

    ctx.state.rateLimiterKey = key;

    await next();
  }
}
