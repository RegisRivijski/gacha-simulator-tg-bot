import _ from 'lodash';

export default async function userValidator(ctx, next) {
  const {
    userData,
  } = ctx.state.data;

  const context = !ctx.update.callback_query
    ? ctx.update.message
    : ctx.update.callback_query;

  const chatId = _.result(context, 'from.id');
  const firstName = _.result(context, 'from.first_name');
  const lastName = _.result(context, 'from.last_name');
  const languageCode = _.result(context, 'language_code');
  const username = _.result(context, 'username');

  const groupChatId = _.result(context, 'chat.id');
  const groupTitle = _.result(context, 'chat.title');
  const groupUsername = _.result(context, 'chat.username');

  await next();
}
