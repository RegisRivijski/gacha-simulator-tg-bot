import {
  reqInstance,
  gachaSimulatorRestOrigin,
} from '../../app/modules/proxyReqInstance.js';

export function getPrimogemsLimit() {
  return reqInstance.get(`${gachaSimulatorRestOrigin}/cron/primogems-limit`)
    .then(({ data }) => data);
}

export function getHowManyUserCanBuy() {
  return reqInstance.get(`${gachaSimulatorRestOrigin}/cron/how-many-user-can-buy`)
    .then(({ data }) => data);
}

export function getAllUsersAndGroupChats() {
  return reqInstance.get(`${gachaSimulatorRestOrigin}/analytics/users-and-group-chats`)
    .then(({ data }) => data);
}

export function getTranslate(code, t) {
  return reqInstance.get(`${gachaSimulatorRestOrigin}/${code}/translate?t=${t}`)
    .then(({ data }) => data);
}

export function getUserData(chatId) {
  return reqInstance.get(`${gachaSimulatorRestOrigin}/user/${chatId}`)
    .then(({ data }) => data);
}

export function configureCronNotification(type, id, isActive) {
  return reqInstance.get(`${gachaSimulatorRestOrigin}/cron/configure-for-notifications/${type}/${id}/${isActive}`)
    .then(({ data }) => data);
}
