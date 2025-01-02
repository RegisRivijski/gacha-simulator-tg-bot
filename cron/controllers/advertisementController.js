import _ from 'lodash';

import {
  MEDIA_TYPE_PHOTO,
} from '../../app/constants/index.js';

import replySwitcher from '../../app/routers/replySwitcher.js';

import * as cronGachaSimulatorManager from '../managers/gachaSimulatorRest.js';

export function advertisementWorker(bot) {
  return async (job, done) => {
    try {
      const activeAdvertisement = await cronGachaSimulatorManager.getActiveAdvertisements();

      if (activeAdvertisement?.message !== undefined) {
        let activeUsers = [];
        let activeGroups = [];

        if (activeAdvertisement?.users) {
          activeUsers = await cronGachaSimulatorManager.getAllActiveUsers();
        }

        if (activeAdvertisement?.groups) {
          activeGroups = await cronGachaSimulatorManager.getAllActiveGroups();
        }

        const allIds = [...activeUsers, ...activeGroups];

        for await (const chatId of allIds) {
          _.set(bot, 'state.chatId', chatId);
          await replySwitcher({
            ctx: bot,
            messageTemplate: activeAdvertisement.message,
            media: {
              media: activeAdvertisement.imageLink,
              mediaType: MEDIA_TYPE_PHOTO,
            },
          })
            .catch((e) => {
              console.error('[ERROR] CRON notificationController primogemsLimit replySwitcher:', e.message);
            });
          job.touch();
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
