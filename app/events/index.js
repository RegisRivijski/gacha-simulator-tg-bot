import { Composer } from 'telegraf';

import replyModule from '../middlewares/replyModule.js';
import dataValidator from '../middlewares/dataValidator.js';
import { commandRateLimiter, wishRateLimiter } from '../middlewares/rateLimiters.js';
import { errorHandler, ignoreOldMessages } from '../middlewares/events.js';

import { getDataByChatId, getDataByChatIdAndPage } from '../helpers/telegraf.js';

import {
  usersWish,
  usersWishX10,
  usersInventory,
  usersProfile,
  usersPrimogems,
  usersHistory,
  usersProfileGetPrimogems,
  usersProfileChangeBanner,
} from '../managers/gachaSimulatorRest.js';

export default new Composer()
  .use(errorHandler)
  .use(ignoreOldMessages)
  .use(commandRateLimiter)

  .command('wish', wishRateLimiter, getDataByChatId(usersWish))
  .command('wish10', wishRateLimiter, getDataByChatId(usersWishX10))

  .action(/^wi /, wishRateLimiter, getDataByChatId(usersWish))
  .action(/^wi10 /, wishRateLimiter, getDataByChatId(usersWishX10))

  .command('inventory', getDataByChatId(usersInventory))
  .action(/^in /, getDataByChatId(usersInventory))

  .command('profile', getDataByChatId(usersProfile))
  .action(/^pr /, getDataByChatId(usersProfile))
  .action(/^pr_get /, getDataByChatId(usersProfileGetPrimogems))
  .action(/^pr_chng /, getDataByChatId(usersProfileChangeBanner))

  .command('history', getDataByChatId(usersHistory))
  .action(/^hi /, getDataByChatIdAndPage(usersHistory))

  .command('primogems', getDataByChatId(usersPrimogems))

  .use(replyModule)
  .use(dataValidator);
