import { Composer } from 'telegraf';

import replyModule from '../middlewares/replyModule.js';
import dataValidator from '../middlewares/dataValidator.js';
import eventWrapper from '../middlewares/eventWrapper.js';
import errorHandler from '../middlewares/errorHandler.js';

import * as proxyRoutes from '../routers/proxy.js';
import * as rateLimiters from '../middlewares/rateLimiters.js';

export default new Composer()
  .use(errorHandler)
  .use(rateLimiters.ignoreOldMessages)
  .use(rateLimiters.commandRateLimiter)

  .command('wish', rateLimiters.wishRateLimiter, eventWrapper(proxyRoutes.usersWish))
  .command('wish10', rateLimiters.wishRateLimiter, eventWrapper(proxyRoutes.usersWishX10))

  .action(/^wi /, rateLimiters.wishRateLimiter, eventWrapper(proxyRoutes.usersWish))
  .action(/^10wi /, rateLimiters.wishRateLimiter, eventWrapper(proxyRoutes.usersWishX10))

  .command('inventory', eventWrapper(proxyRoutes.usersInventory))
  .action(/^in /, eventWrapper(proxyRoutes.usersInventory))

  .command('profile', eventWrapper(proxyRoutes.usersProfile))
  .action(/^pr /, eventWrapper(proxyRoutes.usersProfile))
  .action(/^get_pr /, eventWrapper(proxyRoutes.usersProfileGetPrimogems))
  .action(/^chng_pr /, eventWrapper(proxyRoutes.usersProfileChangeBanner))

  .command('history', eventWrapper(proxyRoutes.usersHistory))
  .action(/^hi /, eventWrapper(proxyRoutes.usersHistory))

  .command('primogems', eventWrapper(proxyRoutes.usersPrimogems))

  .use(replyModule)
  .use(dataValidator);
