import { getCtxData } from '../helpers/telegraf.js';
import { addGroupChat, updateUserData } from '../managers/gachaSimulatorRest.js';

export default async function dataValidator(ctx, next) {
  const userData = ctx.state?.data?.userData ?? {};

  const {
    chatId,
    firstName,
    lastName,
    username,
    groupChatId,
    groupTitle,
    groupUsername,
    languageCode,
    isPersonalMessage,
  } = getCtxData(ctx);

  const fieldsForUpdateUserData = [];

  if (userData.firstName !== firstName) {
    fieldsForUpdateUserData.push({
      key: 'firstName',
      value: firstName,
    });
  }
  if (userData.lastName !== lastName) {
    fieldsForUpdateUserData.push({
      key: 'lastName',
      value: lastName,
    });
  }
  if (userData.username !== username) {
    fieldsForUpdateUserData.push({
      key: 'username',
      value: username,
    });
  }
  if (!userData.languageCode && languageCode) {
    fieldsForUpdateUserData.push({
      key: 'languageCode',
      value: languageCode,
    });
  }
  if (!isPersonalMessage && !userData.groupChatIds.includes(groupChatId)) {
    fieldsForUpdateUserData.push({
      key: 'groupChatIds',
      value: [...userData.groupChatIds, groupChatId],
    });
    addGroupChat(groupChatId, { groupTitle, groupUsername })
      .catch((e) => {
        console.error('[ERROR] 1. middlewares/dataValidator.js addGroupChat:', e.message);
        console.error('[ERROR] 2.', groupChatId, { groupTitle, groupUsername });
      });
  }

  if (fieldsForUpdateUserData.length) {
    updateUserData(chatId, fieldsForUpdateUserData)
      .catch((e) => {
        console.error('[ERROR] 1. middlewares/dataValidator.js updateUserData:', e.message);
        console.error('[ERROR] 2.', chatId, fieldsForUpdateUserData);
      });
  }

  await next();
}
