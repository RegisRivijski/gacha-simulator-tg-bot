import { Composer } from 'telegraf';

import replyModule from '../middlewares/replyModule.js';
import dataValidator from '../middlewares/dataValidator.js';
import proxyRequest from '../middlewares/proxyRequest.js';
import errorHandler from '../middlewares/errorHandler.js';

import * as proxyRoutes from './proxy.js';
import * as rateLimiters from '../middlewares/rateLimiters.js';
import * as paymentsProcessor from '../middlewares/payments.js';

export default new Composer()
  .use(errorHandler)
  .use(paymentsProcessor.successfulPaymentCatcher)
  .use(rateLimiters.ignoreOldMessages)
  .use(rateLimiters.commandRateLimiter)
  .use(paymentsProcessor.paymentsCatcher)

  .action('blank', (ctx) => ctx.answerCbQuery('This button is blank.'))

  .command('start', proxyRequest(proxyRoutes.start))
  .command('help', proxyRequest(proxyRoutes.help))
  .command('settings', proxyRequest(proxyRoutes.settings))
  .command('support', proxyRequest(proxyRoutes.support))
  .command('terms', proxyRequest(proxyRoutes.terms))
  .action(/^sett /, proxyRequest(proxyRoutes.settings))

  .command('wish', proxyRequest(proxyRoutes.usersWish))
  .command('wish10', proxyRequest(proxyRoutes.usersWishX10))

  .action(/^wi /, proxyRequest(proxyRoutes.usersWish))
  .action(/^10wi /, proxyRequest(proxyRoutes.usersWishX10))

  .command('inventory', proxyRequest(proxyRoutes.usersInventory))
  .action(/^in /, proxyRequest(proxyRoutes.usersInventory))

  .command('profile', proxyRequest(proxyRoutes.usersProfile))
  .action(/^pr /, proxyRequest(proxyRoutes.usersProfile))
  .action(/^get_pr /, proxyRequest(proxyRoutes.usersProfileGetPrimogems))
  .action(/^chng_pr /, proxyRequest(proxyRoutes.usersProfileChangeBanner))
  .action(/^new_pr /, proxyRequest(proxyRoutes.usersProfileWithoutUpdate))

  .command('history', proxyRequest(proxyRoutes.usersHistory))
  .action(/^hi /, proxyRequest(proxyRoutes.usersHistory))

  .command('leaderboard', proxyRequest(proxyRoutes.usersLeaderboard))
  .action(/^le/, proxyRequest(proxyRoutes.usersLeaderboard))

  .command('primogems', proxyRequest(proxyRoutes.usersPrimogems))
  .command('referral', proxyRequest(proxyRoutes.usersReferral))
  .command('promocode', proxyRequest(proxyRoutes.usersPromocode))

  .command('shop', proxyRequest(proxyRoutes.usersShop))
  .action(/^sbi /, proxyRequest(proxyRoutes.usersShopBuyItem))

  .command('premium', proxyRequest(proxyRoutes.usersPremium))
  .action(/^prm /, proxyRequest(proxyRoutes.usersPremiumBuy))

  .command('daily', proxyRequest(proxyRoutes.usersDaily))

  .use(replyModule)
  .use(dataValidator);
