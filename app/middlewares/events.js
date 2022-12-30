import {
  IGNORE_OLD_MESSAGE_MINUTES,
} from '../constants/index.js';

import { getContext } from '../helpers/telegraf.js';
import errorHandlerHelper from '../helpers/errorHandler.js';
import { howManyMinutesPast } from '../helpers/timeHelper.js';

export async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (e) {
    errorHandlerHelper(e);
  }
}

export async function ignoreOldMessages(ctx, next) {
  const context = getContext(ctx);
  const tgDate = Number(context.date) * 1000;
  const minutes = howManyMinutesPast(tgDate);
  if (minutes < IGNORE_OLD_MESSAGE_MINUTES) {
    await next();
  }
}
