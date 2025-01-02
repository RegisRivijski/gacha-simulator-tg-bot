import {
  reqInstance,
  gachaSimulatorRestOrigin,
} from '../modules/proxyReqInstance.js';

export function updateUserData(chatId, fields) {
  return reqInstance.put(`${gachaSimulatorRestOrigin}/user/${chatId}`, {
    fields,
  })
    .then(({ data }) => data);
}

export function updateGroupChat(groupChatId, fields) {
  return reqInstance.put(`${gachaSimulatorRestOrigin}/group-chat/${groupChatId}`, {
    fields,
  })
    .then(({ data }) => data);
}

export function addGroupChat(groupChatId, { groupTitle, groupUsername }) {
  return reqInstance.post(`${gachaSimulatorRestOrigin}/group-chat/${groupChatId}`, {
    groupTitle,
    groupUsername,
  })
    .then(({ data }) => data);
}

export function createSuccessfulPayment(successfulPayment) {
  return reqInstance.post(`${gachaSimulatorRestOrigin}/payments/successful`, {
    successfulPayment,
  })
    .then(({ data }) => data);
}
