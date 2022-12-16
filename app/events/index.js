import errorHandler from '../middlewares/errorHandler.js';
import replyModule from '../middlewares/replyModule.js';
import dataValidator from '../middlewares/dataValidator.js';

import { getDataByChatId, getDataByChatIdAndPage } from '../helpers/telegraf.js';

import {
  usersWish, usersWishX10, usersInventory, usersProfile, usersPrimogems, usersHistory,
} from '../managers/gachaSimulatorRest.js';

export default (bot) => bot
  .use(errorHandler)

  // Banners pulling events
  .command('wish', getDataByChatId(usersWish))
  .command('wish10', getDataByChatId(usersWishX10))

  .action(/^wi /, getDataByChatId(usersWish))
  .action(/^wi10 /, getDataByChatId(usersWishX10))

  // Users information
  .command('inventory', getDataByChatId(usersInventory))
  .command('profile', getDataByChatId(usersProfile))
  .command('history', getDataByChatId(usersHistory))

  .action(/^hi /, getDataByChatIdAndPage(usersHistory))
  .action(/^pr /, getDataByChatId(usersProfile))
  .action(/^pr get /, getDataByChatId(usersPrimogems))
  .action(/^in /, getDataByChatId(usersInventory))

  // Shop events
  .command('primogems', getDataByChatId(usersPrimogems))

  .use(replyModule)
  .use(dataValidator);
