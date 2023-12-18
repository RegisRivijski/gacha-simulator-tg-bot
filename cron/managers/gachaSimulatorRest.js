import {
  reqInstance,
  gachaSimulatorRestOrigin,
} from '../../app/modules/proxyReqInstance.js';

export function getPrimogemsLimit() {
  return reqInstance.get(`${gachaSimulatorRestOrigin}/cron/primogems-limit`)
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

export function setActiveTelegramBot(type, id, isActive) {
  return reqInstance.post(`${gachaSimulatorRestOrigin}/analytics/active-telegram-bot`, { type, id, isActive })
    .then(({ data }) => data);
}

export function getActiveAdvertisements() {
  return reqInstance.get(`${gachaSimulatorRestOrigin}/cron/active-advertisement`)
    .then(({ data }) => data);
}

export function getAllActiveUsers() {
  return reqInstance.get(`${gachaSimulatorRestOrigin}/cron/active-users`)
    .then(({ data }) => data);
}

export function getAllActiveGroups() {
  return reqInstance.get(`${gachaSimulatorRestOrigin}/cron/active-groups`)
    .then(({ data }) => data);
}

export function changeAdvertisement(advertisementData) {
  return reqInstance.put(`${gachaSimulatorRestOrigin}/cron/advertisements`, {
    advertisementData,
  })
    .then(({ data }) => data);
}
