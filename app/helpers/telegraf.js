import _ from 'lodash';

import ActionData from '../classes/ActionData.js';

import { cleanObject } from './documentsHelper.js';

export function isAction(ctx) {
  return Boolean(ctx?.update?.callback_query);
}

export function getContext(ctx) {
  return !ctx?.update?.callback_query
    ? ctx?.update?.message
    : ctx?.update?.callback_query;
}

export function getChatId(ctx) {
  if (isAction(ctx)) {
    return _.result(getContext(ctx), 'message.chat.id');
  }
  return _.result(getContext(ctx), 'chat.id') || ctx.state.chatId;
}

export function getCtxData(ctx) {
  const context = getContext(ctx);

  const chatId = _.result(context, 'from.id');
  const firstName = _.result(context, 'from.first_name');
  const lastName = _.result(context, 'from.last_name');
  const username = _.result(context, 'from.username');

  const groupChatId = _.result(context, 'chat.id');
  const groupTitle = _.result(context, 'chat.title');
  const groupUsername = _.result(context, 'chat.username');

  const languageCode = _.result(context, 'language_code');

  const isPersonalMessage = (chatId === groupChatId && groupChatId > 0);

  let commandData = _.result(context, 'text');

  if (commandData) {
    commandData = commandData
      .replace('@genshinGachaSimulatorBot', '')
      .replace('@genshinGachaSimulatorEnBot', '');
  }

  let startData = '';
  if (commandData?.includes('/start')) {
    startData = commandData.replace('/start', '').trim();
  }

  let promocode = '';
  if (commandData?.includes('/promocode')) {
    promocode = commandData.replace('/promocode', '').trim();
  }

  return cleanObject({
    chatId,
    firstName,
    lastName,
    username,
    groupChatId,
    groupTitle,
    groupUsername,
    languageCode,
    isPersonalMessage,
    startData,
    promocode,
  });
}

export function getActionData(ctx) {
  const actionData = new ActionData(ctx);

  return cleanObject({
    ownerId: actionData.getParam('ow:'),
    languageCodeSettings: actionData.getParam('cd:'),
    page: actionData.getParam('pg:'),
    gifEnable: actionData.getParam('gif:'),
    notificationsEnable: actionData.getParam('not:'),
    clearState: actionData.getParam('clear:'),
  });
}
