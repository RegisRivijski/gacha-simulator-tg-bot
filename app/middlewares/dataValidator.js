import _ from 'lodash';
import { updateUserData } from '../managers/gachaSimulatorRest.js';

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

  const fields = [];

  if (userData.firstName !== firstName) {
    fields.push({
      key: 'firstName',
      value: firstName,
    });
  }
  if (userData.lastName !== lastName) {
    fields.push({
      key: 'lastName',
      value: lastName,
    });
  }
  if (userData.username !== username) {
    fields.push({
      key: 'username',
      value: username,
    });
  }

  if (fields.length) {
    updateUserData(chatId, fields);
  }

  await next();
}
