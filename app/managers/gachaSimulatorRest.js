import axios from 'axios';

import config from '../../config/index.js';

const gachaSimulatorRest = `http://${config.rest.gachaSimulatorRest.host}:${config.rest.gachaSimulatorRest.port}`;

export async function usersProfile(chatId) {
  return axios.get(`${gachaSimulatorRest}/tg-bot/user/${chatId}/profile`);
}
export async function usersHistory(chatId, page = 0) {
  return axios.get(`${gachaSimulatorRest}/tg-bot/user/${chatId}/history/${page}`);
}
export async function usersInventory(chatId) {
  return axios.get(`${gachaSimulatorRest}/tg-bot/user/${chatId}/inventory`);
}
export async function usersPrimogems(chatId) {
  return axios.get(`${gachaSimulatorRest}/tg-bot/user/${chatId}/primogems`);
}
export async function usersWish(chatId) {
  return axios.get(`${gachaSimulatorRest}/tg-bot/user/${chatId}/wish`);
}
export async function usersWishX10(chatId) {
  return axios.get(`${gachaSimulatorRest}/tg-bot/user/${chatId}/wish-x10`);
}