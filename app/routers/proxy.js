export const start = {
  route: '/tg-bot/user/<%= chatId %>/start?startData=<%= startData %>',
  defaultData: {
    startData: '',
  },
};
export const help = {
  route: '/tg-bot/user/<%= chatId %>/help',
};
export const settings = {
  // eslint-disable-next-line max-len
  route: '/tg-bot/user/<%= chatId %>/settings?languageCodeSettings=<%= languageCodeSettings %>&gifEnable=<%= gifEnable %>&notificationsEnable=<%= notificationsEnable %>&clearState=<%= clearState %>',
  defaultData: {
    languageCodeSettings: '',
    gifEnable: '',
    notificationsEnable: '',
    clearState: '',
  },
};
export const support = {
  route: '/tg-bot/user/<%= chatId %>/support',
};
export const terms = {
  route: '/tg-bot/user/<%= chatId %>/terms',
};

export const usersProfile = {
  route: '/tg-bot/user/<%= chatId %>/profile',
};
export const usersProfileWithoutUpdate = {
  route: '/tg-bot/user/<%= chatId %>/profile?withoutUpdateMessage=true',
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
export const usersLeaderboard = {
  route: '/tg-bot/user/<%= chatId %>/leaderboard/<%= page %>',
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
export const usersReferral = {
  route: '/tg-bot/user/<%= chatId %>/referral',
};
export const usersPromocode = {
  route: '/tg-bot/user/<%= chatId %>/promocode?promocode=<%= promocode %>',
  defaultData: {
    promocode: '',
  },
};

export const usersWish = {
  route: '/tg-bot/user/<%= chatId %>/wish',
};
export const usersWishX10 = {
  route: '/tg-bot/user/<%= chatId %>/wish-x10',
};

export const usersShop = {
  route: '/tg-bot/user/<%= chatId %>/shop',
};
export const usersShopBuyItem = {
  route: '/tg-bot/user/<%= chatId %>/shop/<%= shopItemId %>',
  defaultData: {
    shopItemId: 0,
  },
};
export const usersProceedPayments = {
  route: '/tg-bot/user/<%= chatId %>/shop/<%= shopItemId %>/proceed',
  defaultData: {
    shopItemId: 0,
  },
};

export const usersPremium = {
  route: '/tg-bot/user/<%= chatId %>/premium',
};
export const usersPremiumBuy = {
  route: '/tg-bot/user/<%= chatId %>/premium/<%= premiumTypeId %>',
  defaultData: {
    premiumTypeId: 0,
  },
};
export const usersProceedPaymentsPremium = {
  route: '/tg-bot/user/<%= chatId %>/premium/<%= premiumTypeId %>/proceed',
  defaultData: {
    premiumTypeId: 0,
  },
};

export const usersDaily = {
  route: '/tg-bot/user/<%= chatId %>/daily',
};
