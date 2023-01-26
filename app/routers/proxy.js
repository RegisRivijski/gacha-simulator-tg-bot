export const usersProfile = {
  route: '/tg-bot/user/<%= chatId %>/profile',
};
export const usersProfileGetPrimogems = {
  route: '/tg-bot/user/<%= chatId %>/profile?getPrimogems=true',
};
export const usersProfileChangeBanner = {
  route: '/tg-bot/user/<%= chatId %>/profile?changeBanner=true',
};
export const usersHistory = {
  route: '/tg-bot/user/<%= chatId %>/history/<%= page %>',
};
export const usersInventory = {
  route: '/tg-bot/user/<%= chatId %>/inventory',
};
export const usersPrimogems = {
  route: '/tg-bot/user/<%= chatId %>/primogems',
};
export const usersWish = {
  route: '/tg-bot/user/<%= chatId %>/wish',
};
export const usersWishX10 = {
  route: '/tg-bot/user/<%= chatId %>/wish-x10',
};
