export const usersProfile = {
  route: '/tg-bot/user/<%= userData.chatId %>/profile',
};
export const usersProfileGetPrimogems = {
  route: '/tg-bot/user/<%= userData.chatId %>/profile?getPrimogems=true',
};
export const usersProfileChangeBanner = {
  route: '/tg-bot/user/<%= userData.chatId %>/profile?changeBanner=true',
};
export const usersHistory = {
  route: '/tg-bot/user/<%= userData.chatId %>/history/<%= page %>',
};
export const usersInventory = {
  route: '/tg-bot/user/<%= userData.chatId %>/inventory',
};
export const usersPrimogems = {
  route: '/tg-bot/user/<%= userData.chatId %>/primogems',
};
export const usersWish = {
  route: '/tg-bot/user/<%= userData.chatId %>/wish',
};
export const usersWishX10 = {
  route: '/tg-bot/user/<%= userData.chatId %>/wish-x10',
};
