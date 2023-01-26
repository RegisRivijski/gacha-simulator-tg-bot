import _ from 'lodash';

export function isAction(ctx) {
  return Boolean(ctx?.update?.callback_query);
}

export function getContext(ctx) {
  return !ctx?.update?.callback_query
    ? ctx?.update?.message
    : ctx?.update?.callback_query;
}

export function getChatId(ctx) {
  return _.result(getContext(ctx), 'from.id') || ctx.state.chatId;
}

export function getUserData(ctx) {
  const context = getContext(ctx);

  const chatId = _.result(context, 'from.id');
  const firstName = _.result(context, 'from.first_name');
  const lastName = _.result(context, 'from.last_name');
  const username = _.result(context, 'username');

  const groupChatId = _.result(context, 'chat.id');
  const groupTitle = _.result(context, 'chat.title');
  const groupUsername = _.result(context, 'chat.username');

  const languageCode = _.result(context, 'language_code');

  const isPersonalMessage = (chatId === groupChatId && groupChatId > 0);

  return {
    chatId,
    firstName,
    lastName,
    username,
    groupChatId,
    groupTitle,
    groupUsername,
    languageCode,
    isPersonalMessage,
  };
}
