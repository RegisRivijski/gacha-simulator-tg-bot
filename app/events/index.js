import { Composer } from 'telegraf';

import replyModule from '../middlewares/replyModule.js';
import dataValidator from '../middlewares/dataValidator.js';
import proxyRequest from '../middlewares/proxyRequest.js';
import errorHandler from '../middlewares/errorHandler.js';

import * as proxyRoutes from '../routers/proxy.js';
import * as rateLimiters from '../middlewares/rateLimiters.js';

export default new Composer()
  .use(errorHandler)
  .use(rateLimiters.ignoreOldMessages)
  .use(rateLimiters.commandRateLimiter)

  .action('blank', (ctx) => ctx.answerCbQuery('This button is blank.'))

  .command('start', proxyRequest(proxyRoutes.start))
  .command('help', proxyRequest(proxyRoutes.help))
  .command('settings', proxyRequest(proxyRoutes.settings))
  .action(/^sett /, proxyRequest(proxyRoutes.settings))

  .command('wish', rateLimiters.wishRateLimiter, proxyRequest(proxyRoutes.usersWish))
  .command('wish10', rateLimiters.wishRateLimiter, proxyRequest(proxyRoutes.usersWishX10))

  .action(/^wi /, rateLimiters.wishRateLimiter, proxyRequest(proxyRoutes.usersWish))
  .action(/^10wi /, rateLimiters.wishRateLimiter, proxyRequest(proxyRoutes.usersWishX10))

  .command('inventory', proxyRequest(proxyRoutes.usersInventory))
  .action(/^in /, proxyRequest(proxyRoutes.usersInventory))

  .command('profile', proxyRequest(proxyRoutes.usersProfile))
  .action(/^pr /, proxyRequest(proxyRoutes.usersProfile))
  .action(/^get_pr /, proxyRequest(proxyRoutes.usersProfileGetPrimogems))
  .action(/^chng_pr /, proxyRequest(proxyRoutes.usersProfileChangeBanner))

  .command('history', proxyRequest(proxyRoutes.usersHistory))
  .action(/^hi /, proxyRequest(proxyRoutes.usersHistory))

  .command('primogems', proxyRequest(proxyRoutes.usersPrimogems))
  .command('referral', proxyRequest(proxyRoutes.usersReferral))

  .use(replyModule)
  .use(dataValidator);
