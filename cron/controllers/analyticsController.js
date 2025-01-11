import _ from 'lodash';

import {
  TELEGRAM_USER_TYPE,
  TELEGRAM_GROUP_TYPE,
} from '../constants/index.js';

import replySwitcher from '../../app/routers/replySwitcher.js';

import * as gachaSimulatorManager from '../managers/gachaSimulatorRest.js';

export function configureNotification(bot) {
  return async (job, done) => {
    try {
      const { users, groups } = await gachaSimulatorManager.getAllUsersAndGroupChats();

      const allCount = users.length + groups.length;
      let activeUsers = 0;
      let activeGroups = 0;

      console.info('[INFO] configureNotification allUsersCount:', allCount);

      for await (const id of users) {
        _.set(bot, 'state.chatId', id);
        await replySwitcher({
          ctx: bot,
        })
          .then(() => {
            activeUsers += 1;
            return gachaSimulatorManager.setActiveTelegramBot(TELEGRAM_USER_TYPE, id, true);
          })
          .catch(() => gachaSimulatorManager.setActiveTelegramBot(TELEGRAM_USER_TYPE, id, false));
        job.touch();
      }

      for await (const id of groups) {
        _.set(bot, 'state.chatId', id);
        await replySwitcher({
          ctx: bot,
        })
          .then(() => {
            activeGroups += 1;
            return gachaSimulatorManager.setActiveTelegramBot(TELEGRAM_GROUP_TYPE, id, true);
          })
          .catch(() => gachaSimulatorManager.setActiveTelegramBot(TELEGRAM_GROUP_TYPE, id, false));
        job.touch();
      }

      console.info('[INFO] congifugureNotification activeUsers:', activeUsers, 'activeGroups:', activeGroups);
    } catch (e) {
      console.error('[FATAL ERROR] CRON analyticsController congifugureCronNotification:', e.message);
    } finally {
      done();
    }
  };
}
