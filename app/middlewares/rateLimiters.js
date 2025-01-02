import {
  MESSAGE_RATE_LIMIT_TTL,
  BANNER_RATE_LIMIT_TTL,
  IGNORE_OLD_MESSAGE_MINUTES,
} from '../constants/index.js';

import { client } from '../modules/redis.js';
import { howManyMinutesPast } from '../helpers/timeHelper.js';
import { getContext, getCtxData, isAction, isPayment } from '../helpers/telegraf.js';

export async function commandRateLimiter(ctx, next) {
  const {
    chatId,
    groupChatId,
  } = getCtxData(ctx);

  const key = `message_${chatId}_${groupChatId}`;
  const rateLimit = await client.get(key);

  if (!rateLimit) {
    const currentDate = String(new Date().getTime());
    await client.set(key, currentDate, {
      EX: MESSAGE_RATE_LIMIT_TTL,
    });
    await next();
  } else if (isAction(ctx)) {
    ctx.answerCbQuery('You are clicking too often.');
  }
}

export async function wishRateLimiter(ctx, next) {
  const {
    chatId,
    groupChatId,
  } = getCtxData(ctx);

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

export async function ignoreOldMessages(ctx, next) {
  if (isAction(ctx) || isPayment(ctx)) {
    await next();
  } else {
    const context = getContext(ctx);
    const tgDate = Number(context?.date) * 1000;
    const minutes = howManyMinutesPast(tgDate);
    if (minutes < IGNORE_OLD_MESSAGE_MINUTES) {
      await next();
    }
  }
}
