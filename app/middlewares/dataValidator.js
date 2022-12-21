import _ from 'lodash';
import errorHandler from '../helpers/errorHandler.js';
import { addGroupChat, updateUserData } from '../managers/gachaSimulatorRest.js';

export default async function dataValidator(ctx, next) {
  const {
    userData,
  } = ctx.state.data;

  const context = !ctx.update.callback_query
    ? ctx.update.message
    : ctx.update.callback_query;

  const chatId = _.result(context, 'from.id');
  const firstName = _.result(context, 'from.first_name');
  const lastName = _.result(context, 'from.last_name');
  const username = _.result(context, 'username');

  const groupChatId = _.result(context, 'chat.id');
  const groupTitle = _.result(context, 'chat.title');
  const groupUsername = _.result(context, 'chat.username');

  const isPersonalMessage = (chatId === groupChatId && groupChatId > 0);

  const fieldsForUpdateUserData = [];

  if (userData.firstName !== firstName) {
    fieldsForUpdateUserData.push({
      key: 'firstName',
      value: firstName,
    });
  }
  if (userData.lastName !== lastName) {
    fieldsForUpdateUserData.push({
      key: 'lastName',
      value: lastName,
    });
  }
  if (userData.username !== username) {
    fieldsForUpdateUserData.push({
      key: 'username',
      value: username,
    });
  }
  if (!userData.languageCode && context.language_code) {
    fieldsForUpdateUserData.push({
      key: 'languageCode',
      value: context.language_code,
    });
  }
  if (!isPersonalMessage && !userData.groupChatIds.includes(groupChatId)) {
    fieldsForUpdateUserData.push({
      key: 'groupChatIds',
      value: [...userData.groupChatIds, groupChatId],
    });
    addGroupChat(groupChatId, { groupTitle, groupUsername })
      .catch(errorHandler);
  }

  if (fieldsForUpdateUserData.length) {
    updateUserData(chatId, fieldsForUpdateUserData)
      .catch(errorHandler);
  }

  await next();
}
