import _ from 'lodash';
import axios from 'axios';

import { getActionData, getCtxData, isAction } from '../helpers/telegraf.js';
import config from '../../config/index.js';

import { gachaSimulatorRestOrigin } from '../modules/proxyReqInstance.js';

export default function proxyRequest(routeData) {
  return async (ctx, next) => {
    const ctxData = getCtxData(ctx);
    const actionData = getActionData(ctx);

    if (actionData?.ownerId && Number(actionData.ownerId) !== Number(ctxData.chatId)) {
      ctx.answerCbQuery('This is not your message.');
      return null;
    }

    const route = _.template(routeData.route)({
      ...routeData?.defaultData,
      ...ctxData,
      ...actionData,
    });
    ctx.state.data = await axios.get(`${gachaSimulatorRestOrigin}${route}`, {
      headers: {
        'x-secure-hash': config.rest.gachaSimulatorRest.apiKey,
        'x-default-langcode': config.languages.defaultLangCode,
        'x-is-action': isAction(ctx),
      },
    })
      .then(({ data }) => data)
      .catch((e) => {
        console.error('[ERROR] proxyRequest', route, ':', e.message);
        throw e;
      });

    if (next) {
      await next();
    }
  };
}
