import { Composer } from 'telegraf';

import errorHandler from '../middlewares/errorHandler.js';
import replyModule from '../middlewares/replyModule.js';
import dataValidator from '../middlewares/dataValidator.js';

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

  .command('wish', getDataByChatId(usersWish))
  .command('wish10', getDataByChatId(usersWishX10))
  .command('inventory', getDataByChatId(usersInventory))
  .command('profile', getDataByChatId(usersProfile))
  .command('history', getDataByChatId(usersHistory))
  .command('primogems', getDataByChatId(usersPrimogems))

  .action(/^wi /, getDataByChatId(usersWish))
  .action(/^wi10 /, getDataByChatId(usersWishX10))
  .action(/^hi /, getDataByChatIdAndPage(usersHistory))
  .action(/^pr /, getDataByChatId(usersProfile))
  .action(/^pr_get /, getDataByChatId(usersProfileGetPrimogems))
  .action(/^pr_chng /, getDataByChatId(usersProfileChangeBanner))
  .action(/^in /, getDataByChatId(usersInventory))

  .use(replyModule)
  .use(dataValidator);
