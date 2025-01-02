import _ from 'lodash';

import {
  TELEGRAM_USER_TYPE,
  TELEGRAM_GROUP_TYPE,
} from '../constants/index.js';

import replySwitcher from '../../app/routers/replySwitcher.js';

import * as gachaSimulatorManager from '../managers/gachaSimulatorRest.js';

export function congifugureNotification(bot) {
  return async (job, done) => {
    try {
      const { users, groups } = await gachaSimulatorManager.getAllUsersAndGroupChats();

      const allCount = users.length + groups.length;

      console.info('[INFO] congifugureNotification allUsersCount:', allCount);

      for await (const id of users) {
        _.set(bot, 'state.chatId', id);
        await replySwitcher({
          ctx: bot,
        })
          .then(() => gachaSimulatorManager.setActiveTelegramBot(TELEGRAM_USER_TYPE, id, true))
          .catch(() => gachaSimulatorManager.setActiveTelegramBot(TELEGRAM_USER_TYPE, id, false));
        job.touch();
      }

      for await (const id of groups) {
        _.set(bot, 'state.chatId', id);
        await replySwitcher({
          ctx: bot,
        })
          .then(() => gachaSimulatorManager.setActiveTelegramBot(TELEGRAM_GROUP_TYPE, id, true))
          .catch(() => gachaSimulatorManager.setActiveTelegramBot(TELEGRAM_GROUP_TYPE, id, false));
        job.touch();
      }
    } catch (e) {
      console.error('[FATAL ERROR] CRON analyticsController congifugureCronNotification:', e.message);
    } finally {
      done();
    }
  };
}
