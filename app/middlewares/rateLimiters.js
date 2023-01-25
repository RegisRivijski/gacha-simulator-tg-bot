import {
  MESSAGE_RATE_LIMIT_TTL,
  BANNER_RATE_LIMIT_TTL,
} from '../constants/index.js';

import { getUserData } from '../helpers/telegraf.js';
import { client } from '../modules/redis.js';

export async function commandRateLimiter(ctx, next) {
  const {
    chatId,
    groupChatId,
  } = getUserData(ctx);

  const key = `message_${chatId}_${groupChatId}`;
  const rateLimit = await client.get(key);

  if (!rateLimit) {
    const currentDate = String(new Date().getTime());
    await client.set(key, currentDate, {
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
  const isSpin = await client.get(key);

  if (!isSpin) {
    const currentDate = String(new Date().getTime());

    await client.set(key, currentDate, {
      EX: BANNER_RATE_LIMIT_TTL,
    });

    ctx.state.rateLimiterKey = key;

    await next();
  }
}
