import _ from 'lodash';

import {
  MEDIA_TYPE_PHOTO,
} from '../../app/constants/index.js';

import replyByTemplate from '../../app/helpers/replyTemplatesHelper.js';

import * as cronGachaSimulatorManager from '../managers/gachaSimulatorRest.js';

import { progress } from '../helpers/utils.js';

export function advertisementWorker(bot) {
  return async (job, done) => {
    try {
      const activeAdvertisement = await cronGachaSimulatorManager.getActiveAdvertisements();

      if (!activeAdvertisement?.delivered) {
        let activeUsers = [];
        let activeGroups = [];
        let counter = 0;

        if (activeAdvertisement?.users) {
          activeUsers = await cronGachaSimulatorManager.getAllActiveUsers();
        }

        if (activeAdvertisement?.groups) {
          activeGroups = await cronGachaSimulatorManager.getAllActiveGroups();
        }

        const allIds = [...activeUsers, ...activeGroups];
        const allCount = allIds.length;

        for await (const chatId of allIds) {
          _.set(bot, 'state.chatId', chatId);
          await replyByTemplate({
            ctx: bot,
            messageTemplate: activeAdvertisement.message,
            media: {
              media: activeAdvertisement.imageLink,
              mediaType: MEDIA_TYPE_PHOTO,
            },
          })
            .catch((e) => {
              console.error('[ERROR] CRON notificationController primogemsLimit replyByTemplate:', e.message);
            });
          counter += 1;
          job.progress(progress(counter, allCount));
        }

        await cronGachaSimulatorManager.changeAdvertisement({
          ...activeAdvertisement,
          delivered: true,
        });
      }

    } catch (e) {
      console.error('[FATAL ERROR] CRON notificationController primogemsLimit:', e.message);
    } finally {
      done();
    }
  };
}
