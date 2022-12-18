import axios from 'axios';

import config from '../../config/index.js';

const reqInstance = axios.create({
  headers: {
    'x-secure-hash': config.rest.gachaSimulatorRest.apiKey,
    'x-default-langcode': config.languages.defaultLangCode,
  },
});

const gachaSimulatorRest = `http://${config.rest.gachaSimulatorRest.host}:${config.rest.gachaSimulatorRest.port}`;

export function usersProfile(chatId) {
  return reqInstance.get(`${gachaSimulatorRest}/tg-bot/user/${chatId}/profile`)
    .then(({ data }) => data);
}

export function usersProfileGetPrimogems(chatId) {
  return reqInstance.get(`${gachaSimulatorRest}/tg-bot/user/${chatId}/profile?getPrimogems=true`)
    .then(({ data }) => data);
}

export function usersProfileChangeBanner(chatId) {
  return reqInstance.get(`${gachaSimulatorRest}/tg-bot/user/${chatId}/profile?changeBanner=true`)
    .then(({ data }) => data);
}

export function usersHistory(chatId, page = 0) {
  return reqInstance.get(`${gachaSimulatorRest}/tg-bot/user/${chatId}/history/${page}`)
    .then(({ data }) => data);
}

export function usersInventory(chatId) {
  return reqInstance.get(`${gachaSimulatorRest}/tg-bot/user/${chatId}/inventory`)
    .then(({ data }) => data);
}

export function usersPrimogems(chatId) {
  return reqInstance.get(`${gachaSimulatorRest}/tg-bot/user/${chatId}/primogems`)
    .then(({ data }) => data);
}

export function usersWish(chatId) {
  return reqInstance.get(`${gachaSimulatorRest}/tg-bot/user/${chatId}/wish`)
    .then(({ data }) => data);
}

export function usersWishX10(chatId) {
  return reqInstance.get(`${gachaSimulatorRest}/tg-bot/user/${chatId}/wish-x10`)
    .then(({ data }) => data);
}

export function updateUserData(chatId, fields) {
  return reqInstance.put(`${gachaSimulatorRest}/user/${chatId}`, {
    fields,
  })
    .then(({ data }) => data);
}

export function updateGroupChat(groupChatId, fields) {
  return reqInstance.put(`${gachaSimulatorRest}/group-chat/${groupChatId}`, {
    fields,
  })
    .then(({ data }) => data);
}

export function addGroupChat(groupChatId, { groupTitle, groupUsername }) {
  return reqInstance.post(`${gachaSimulatorRest}/group-chat/${groupChatId}`, {
    groupTitle,
    groupUsername,
  })
    .then(({ data }) => data);
}

export function getAllActiveUsersWithPrimogemsLimit() {
  return reqInstance.get(`${gachaSimulatorRest}/analytics/all-active-users-with-primogems-limit`)
    .then(({ data }) => data);
}

export function getAllActiveUsers() {
  return reqInstance.get(`${gachaSimulatorRest}/analytics/all-active-users`)
    .then(({ data }) => data);
}

export function getTranslate(code, t) {
  return reqInstance.get(`${gachaSimulatorRest}/${code}/translate?t=${t}`)
    .then(({ data }) => data);
}

export function getUserData(chatId) {
  return reqInstance.get(`${gachaSimulatorRest}/user/${chatId}`)
    .then(({ data }) => data);
}
