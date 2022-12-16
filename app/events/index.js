import errorHandler from '../middlewares/errorHandler.js';
import replyModule from '../middlewares/replyModule.js';
import userValidator from '../middlewares/userValidator.js';

import * as gachaSimulatorRest from '../managers/gachaSimulatorRest.js';
import * as telegrafHelper from '../helpers/telegraf.js';

export default (bot) => bot
  .use(errorHandler)

  // Banners pulling events
  .command('wish', telegrafHelper.getDataByChatId(gachaSimulatorRest.usersWish))
  .command('wish10', telegrafHelper.getDataByChatId(gachaSimulatorRest.usersWishX10))

  .action(/^wi /, telegrafHelper.getDataByChatId(gachaSimulatorRest.usersWish))
  .action(/^wi10 /, telegrafHelper.getDataByChatId(gachaSimulatorRest.usersWishX10))

  // Users information
  .command('inventory', telegrafHelper.getDataByChatId(gachaSimulatorRest.usersInventory))
  .command('profile', telegrafHelper.getDataByChatId(gachaSimulatorRest.usersProfile))
  .command('history', telegrafHelper.getDataByChatId(gachaSimulatorRest.usersHistory))

  .action(/^hi /, telegrafHelper.getDataByChatId(gachaSimulatorRest.usersHistory))
  .action(/^pr /, telegrafHelper.getDataByChatId(gachaSimulatorRest.usersProfile))
  .action(/^pr get /, telegrafHelper.getDataByChatId(gachaSimulatorRest.usersPrimogems))
  .action(/^in /, telegrafHelper.getDataByChatId(gachaSimulatorRest.usersInventory))

  // Shop events
  .command('primogems', telegrafHelper.getDataByChatId(gachaSimulatorRest.usersPrimogems))

  .use(replyModule)
  .use(userValidator);
