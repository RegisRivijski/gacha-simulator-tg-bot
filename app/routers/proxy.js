export const usersProfile = {
  route: '/tg-bot/user/<%= ctxData.chatId %>/profile',
};
export const usersProfileGetPrimogems = {
  route: '/tg-bot/user/<%= ctxData.chatId %>/profile?getPrimogems=true',
};
export const usersProfileChangeBanner = {
  route: '/tg-bot/user/<%= ctxData.chatId %>/profile?changeBanner=true',
};
export const usersHistory = {
  route: '/tg-bot/user/<%= ctxData.chatId %>/history/<%= page %>',
  defaultData: {
    page: 0,
  },
};
export const usersInventory = {
  route: '/tg-bot/user/<%= ctxData.chatId %>/inventory',
};
export const usersPrimogems = {
  route: '/tg-bot/user/<%= ctxData.chatId %>/primogems',
};
export const usersWish = {
  route: '/tg-bot/user/<%= ctxData.chatId %>/wish',
};
export const usersWishX10 = {
  route: '/tg-bot/user/<%= ctxData.chatId %>/wish-x10',
};
