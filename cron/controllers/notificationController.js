import _ from 'lodash';

import {
  MEDIA_TYPE_STICKER,
} from '../../app/constants/index.js';

import delay from '../../app/helpers/delayHelper.js';
import replyByTemplate from '../../app/helpers/replyTemplatesHelper.js';

import {
  getAllActiveUsersWithPrimogemsLimit,
  getAllActiveUsers,
  getTranslate,
  getUserData,
} from '../../app/managers/gachaSimulatorRest.js';

export function primogemsLimit(bot) {
  return async () => {
    try {
      const media = '';
      const mediaType = MEDIA_TYPE_STICKER;

      const allUsersDataIds = await getAllActiveUsersWithPrimogemsLimit();

      for await (const chatId of allUsersDataIds) {
        const userData = await getUserData(chatId)
          .catch((e) => {
            console.error('[ERROR] CRON notificationController primogemsLimit getUserData:', e.message);
            return {};
          });
        const { additionalData } = userData;

        _.set(bot, 'state.chatId', chatId);

        if (additionalData?.primogemsGetMaxLimit) {
          const messageTemplate = await getTranslate(userData.languageCode, 'cron.maxPrimogems')
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
            .then(() => delay(5000))
            .catch((e) => {
              console.error('[ERROR] CRON notificationController primogemsLimit replyByTemplate:', e.message);
            });
        }
      }
    } catch (e) {
      console.error('[FATAL ERROR] CRON notificationController primogemsLimit:', e.message);
    }
  };
}

export function howManyUserCanBuy(bot) {
  return async () => {
    try {
      const media = '';
      const mediaType = MEDIA_TYPE_STICKER;

      const allUsersDataIds = await getAllActiveUsers();

      for await (const chatId of allUsersDataIds) {
        const userData = await getUserData(chatId)
          .catch((e) => {
            console.error('[ERROR] CRON notificationController howManyUserCanBuy getUserData:', e.message);
            return {};
          });
        const { additionalData } = userData;

        _.set(bot, 'state.chatId', chatId);

        if (additionalData?.canBuyWishes > 10 && additionalData?.hoursFromLastWish >= 72) {
          const messageTemplate = await getTranslate(userData.languageCode, 'cron.fatesCount')
            .then((message) => message.replace('{fatesCount}', String(additionalData.canBuyWishes)))
            .catch((e) => {
              console.error('[ERROR] CRON notificationController howManyUserCanBuy getTranslate:', e.message);
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
            .then(() => delay(5000))
            .catch((e) => {
              console.error('[ERROR] CRON notificationController howManyUserCanBuy replyByTemplate:', e.message);
            });
        }
      }
    } catch (e) {
      console.error('[FATAL ERROR] CRON notificationController howManyUserCanBuy:', e.message);
    }
  };
}
