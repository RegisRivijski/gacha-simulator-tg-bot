import _ from 'lodash';

import {
  MEDIA_TYPE_STICKER,
} from '../../app/constants/index.js';

import replyByTemplate from '../../app/helpers/replyTemplatesHelper.js';
import { progress } from '../helpers/utils.js';

import * as cronGachaSimulatorManager from '../managers/gachaSimulatorRest.js';

export function primogemsLimit(bot) {
  return async (job, done) => {
    try {
      const media = 'https://artur-petrov.vinnica.ua/public/img/gacha-simulator/stickers/primogemsPaimon.webp';
      const mediaType = MEDIA_TYPE_STICKER;

      const allUsersDataIds = await cronGachaSimulatorManager.getPrimogemsLimit();
      const allUsersCount = allUsersDataIds.length;

      console.info('[INFO] primogemsLimit allUsersCount:', allUsersCount);

      for await (const [i, chatId] of allUsersDataIds.entries()) {
        const userData = await cronGachaSimulatorManager.getUserData(chatId)
          .catch((e) => {
            console.error('[ERROR] CRON notificationController primogemsLimit getUserData:', e.message);
            return {};
          });
        const { additionalData } = userData;

        _.set(bot, 'state.chatId', chatId);

        if (additionalData?.primogemsGetMaxLimit) {
          const messageTemplate = await cronGachaSimulatorManager.getTranslate(userData.languageCode, 'cron.maxPrimogems')
            .catch((e) => {
              console.error('[ERROR] CRON notificationController primogemsLimit getTranslate:', e.message);
              return '';
            });

          await replyByTemplate({
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
        job.progress(progress(i, allUsersCount));
      }
    } catch (e) {
      console.error('[FATAL ERROR] CRON notificationController primogemsLimit:', e.message);
    } finally {
      done();
    }
  };
}
