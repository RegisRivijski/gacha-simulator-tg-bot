import _ from 'lodash';

import {
  MEDIA_TYPE_STICKER,
} from '../../app/constants/index.js';
import {
  GACHA_SIMULATOR_REST_CACHE_SEC,
} from '../../app/constants/cache.js';

import replySwitcher from '../../app/routers/replySwitcher.js';

import cacheWrapper from '../../app/helpers/cacheWrapper.js';

import * as cronGachaSimulatorManager from '../managers/gachaSimulatorRest.js';

const cronGachaSimulatorManagerCache = cacheWrapper(cronGachaSimulatorManager, GACHA_SIMULATOR_REST_CACHE_SEC);

export function primogemsLimit(bot) {
  return async (job, done) => {
    try {
      const media = 'https://artur-petrov.vinnica.ua/public/img/gacha-simulator/stickers/primogemsPaimon.webp';
      const mediaType = MEDIA_TYPE_STICKER;

      const allUsersDataIds = await cronGachaSimulatorManager.getPrimogemsLimit();
      const allUsersCount = allUsersDataIds.length;

      console.info('[INFO] primogemsLimit allUsersCount:', allUsersCount);

      for await (const { chatId, languageCode } of allUsersDataIds) {
        _.set(bot, 'state.chatId', chatId);

        const messageTemplate = await cronGachaSimulatorManagerCache.getTranslate(languageCode, 'cron.maxPrimogems')
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
        job.touch();
      }
    } catch (e) {
      console.error('[FATAL ERROR] CRON notificationController primogemsLimit:', e.message);
    } finally {
      done();
    }
  };
}
