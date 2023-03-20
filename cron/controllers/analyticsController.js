import _ from 'lodash';

import {
  TELEGRAM_USER_TYPE,
  TELEGRAM_GROUP_TYPE,
} from '../constants/index.js';

import replyByTemplate from '../../app/helpers/replyTemplatesHelper.js';

import * as gachaSimulatorManager from '../managers/gachaSimulatorRest.js';
import { progress } from '../helpers/utils.js';

export function congifugureNotification(bot) {
  return async (job, done) => {
    try {
      const { users, groups } = await gachaSimulatorManager.getAllUsersAndGroupChats();

      const allCount = users.length + groups.length;
      let counter = 0;

      for await (const id of users) {
        _.set(bot, 'state.chatId', id);
        await replyByTemplate({
          ctx: bot,
        })
          .then(() => gachaSimulatorManager.setActiveTelegramBot(TELEGRAM_USER_TYPE, id, true))
          .catch(() => gachaSimulatorManager.setActiveTelegramBot(TELEGRAM_USER_TYPE, id, false));
        counter += 1;
        job.progress(progress(counter, allCount));
      }

      for await (const id of groups) {
        _.set(bot, 'state.chatId', id);
        await replyByTemplate({
          ctx: bot,
        })
          .then(() => gachaSimulatorManager.setActiveTelegramBot(TELEGRAM_GROUP_TYPE, id, true))
          .catch(() => gachaSimulatorManager.setActiveTelegramBot(TELEGRAM_GROUP_TYPE, id, false));
        counter += 1;
        job.progress(progress(counter, allCount));
      }
    } catch (e) {
      console.error('[FATAL ERROR] CRON analyticsController congifugureCronNotification:', e.message);
    } finally {
      done();
    }
  };
}
