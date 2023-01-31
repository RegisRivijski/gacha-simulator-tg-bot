export const start = {
  route: '/tg-bot/user/<%= chatId %>/start',
};
export const help = {
  route: '/tg-bot/user/<%= chatId %>/help',
};
export const settings = {
  route: '/tg-bot/user/<%= chatId %>/settings?languageCodeSettings=<%= languageCodeSettings %>',
  defaultData: {
    languageCodeSettings: '',
  },
};
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
  defaultData: {
    page: 0,
  },
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
