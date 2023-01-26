import _ from 'lodash';
import axios from 'axios';

import { getUserData, isAction } from '../helpers/telegraf.js';
import config from '../../config/index.js';

export default function eventWrapper(routeData) {
  return async (ctx, next) => {
    const userData = getUserData(ctx);
    const route = _.template(routeData.route)({
      userData,
    });
    ctx.state.data = await axios.get(route, {
      headers: {
        'x-secure-hash': config.rest.gachaSimulatorRest.apiKey,
        'x-default-langcode': config.languages.defaultLangCode,
        'x-is-action': isAction(ctx),
      },
    });
    await next();
  };
}
