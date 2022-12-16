import errorHandler from '../middlewares/errorHandler.js';
import replyModule from '../middlewares/replyModule.js';
import userValidator from '../middlewares/userValidator.js';

import * as gachaSimulatorRest from '../managers/gachaSimulatorRest.js';
import * as telegrafHelper from '../helpers/telegraf.js';

export default (bot) => {
  return bot
    .use(errorHandler)

    // Standard events (additional information)
    // .command('start')
    // .command('help')
    // .command('about')
    // .command('settings')

    // Banners pulling events
    .command('wish', telegrafHelper.getDataByChatId(gachaSimulatorRest.usersWish))
    .command('wish10', telegrafHelper.getDataByChatId(gachaSimulatorRest.usersWishX10))

    // Users information
    .command('inventory', telegrafHelper.getDataByChatId(gachaSimulatorRest.usersInventory))
    .command('profile', telegrafHelper.getDataByChatId(gachaSimulatorRest.usersProfile))
    .command('history', telegrafHelper.getDataByChatId(gachaSimulatorRest.usersHistory))
    // .command('referral')

    // Shop events
    .command('primogems', telegrafHelper.getDataByChatId(gachaSimulatorRest.usersPrimogems))

    .use(replyModule)
    .use(userValidator);
}
