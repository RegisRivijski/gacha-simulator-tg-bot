import { addGroupChat, updateUserData } from '../managers/gachaSimulatorRest.js';

export function validateAndUpdateUserData({
  ctxData,
  userData,
}) {
  const {
    chatId,
    firstName,
    lastName,
    username,
    groupChatId,
    groupTitle,
    groupUsername,
    isPersonalMessage,
  } = ctxData;

  const fieldsForUpdateUserData = [];

  if (firstName && userData.firstName !== firstName) {
    fieldsForUpdateUserData.push({
      key: 'firstName',
      value: firstName,
    });
  }
  if (lastName && userData.lastName !== lastName) {
    fieldsForUpdateUserData.push({
      key: 'lastName',
      value: lastName,
    });
  }
  if (username && userData.username !== username) {
    fieldsForUpdateUserData.push({
      key: 'username',
      value: username,
    });
  }
  if (groupChatId && !isPersonalMessage && !userData.groupChatIds.includes(groupChatId)) {
    fieldsForUpdateUserData.push({
      key: 'groupChatIds',
      value: [...userData.groupChatIds, groupChatId],
    });
    addGroupChat(groupChatId, { groupTitle, groupUsername })
      .catch((e) => {
        console.error('[ERROR] 1. helpers/dataValidator.js addGroupChat:', e.message);
        console.error(' ---->  2.', groupChatId, { groupTitle, groupUsername });
      });
  }

  if (chatId && fieldsForUpdateUserData.length) {
    updateUserData(chatId, fieldsForUpdateUserData)
      .catch((e) => {
        console.error('[ERROR] 1. helpers/dataValidator.js updateUserData:', e.message);
        console.error(' ---->  2.', chatId, fieldsForUpdateUserData);
      });
  }
}
