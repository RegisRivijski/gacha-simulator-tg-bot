import {
  MEDIA_TYPE_STICKER,
} from '../../app/constants/index.js';

import delay from '../../app/helpers/delayHelper.js';
import errorHandler from '../../app/helpers/errorHandler.js';
import replyModuleHelper from '../../app/helpers/replyModuleHelper.js';

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
        const userData = await getUserData(chatId);
        const { additionalData } = userData;

        // eslint-disable-next-line no-param-reassign
        bot.state.chatId = chatId;

        if (additionalData?.primogemsGetMaxLimit) {
          const messageTemplate = await getTranslate(userData.languageCode, 'cron.maxPrimogems');

          await replyModuleHelper({
            ctx: bot,
            messageTemplate,
            media: {
              media,
              mediaType,
            },
          });

          await delay(5000);
        }
      }
    } catch (e) {
      errorHandler(e);
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
        const userData = await getUserData(chatId);
        const { additionalData } = userData;

        // eslint-disable-next-line no-param-reassign
        bot.state.chatId = chatId;

        if (additionalData?.canBuyWishes > 10 && additionalData?.hoursFromLastWish >= 72) {
          const messageTemplate = await getTranslate(userData.languageCode, 'cron.fatesCount')
            .then((message) => message.replace('{fatesCount}', String(additionalData.canBuyWishes)));

          await replyModuleHelper({
            ctx: bot,
            messageTemplate,
            media: {
              media,
              mediaType,
            },
          });

          await delay(5000);
        }
      }
    } catch (e) {
      errorHandler(e);
    }
  };
}
