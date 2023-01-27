import _ from 'lodash';
import axios from 'axios';

import { getCtxData, isAction } from '../helpers/telegraf.js';
import config from '../../config/index.js';

const gachaSimulatorRestOrigin = `http://${config.rest.gachaSimulatorRest.host}:${config.rest.gachaSimulatorRest.port}`;

export default function eventWrapper(routeData) {
  return async (ctx, next) => {
    const ctxData = getCtxData(ctx);
    const route = _.template(routeData.route)({
      ctxData,
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
        console.error('[ERROR] eventWrapper', route, ':', e.message);
        throw e;
      });
    await next();
  };
}
