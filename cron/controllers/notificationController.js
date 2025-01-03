import _ from 'lodash';

import {
  MEDIA_TYPE_STICKER,
} from '../../app/constants/index.js';

import replySwitcher from '../../app/routers/replySwitcher.js';

import * as cronGachaSimulatorManager from '../managers/gachaSimulatorRest.js';

export function primogemsLimit(bot) {
  return async (job, done) => {
    try {
      const media = 'https://artur-petrov.vinnica.ua/public/img/gacha-simulator/stickers/primogemsPaimon.webp';
      const mediaType = MEDIA_TYPE_STICKER;

      const allUsersDataIds = await cronGachaSimulatorManager.getPrimogemsLimit();
      const allUsersCount = allUsersDataIds.length;

      console.info('[INFO] primogemsLimit allUsersCount:', allUsersCount);

      for await (const chatId of allUsersDataIds) {
        const userData = await cronGachaSimulatorManager.getUserData(chatId)
          .catch((e) => {
            console.error('[ERROR] CRON notificationController primogemsLimit getUserData:', e.message);
            return {};
          });
        const { additionalData } = userData;

        _.set(bot, 'state.chatId', chatId);

        if (userData?.notificationsEnable && additionalData?.primogemsGetMaxLimit) {
          const messageTemplate = await cronGachaSimulatorManager.getTranslate(userData.languageCode, 'cron.maxPrimogems')
            .catch((e) => {
              console.error('[ERROR] CRON notificationController primogemsLimit getTranslate:', e.message);
              return '';
            });

          await replySwitcher({
            ctx: bot,
            messageTemplate,
            media: {
              media,
              mediaType,
            },
          })
            .catch((e) => {
              console.error('[ERROR] CRON notificationController primogemsLimit replyByTemplate:', e.message);
            });
        }
        job.touch();
      }
    } catch (e) {
      console.error('[FATAL ERROR] CRON notificationController primogemsLimit:', e.message);
    } finally {
      done();
    }
  };
}
