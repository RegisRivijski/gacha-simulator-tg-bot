import axios from 'axios';

import config from '../../config/index.js';

export const reqInstance = axios.create({
  headers: {
    'x-secure-hash': config.rest.gachaSimulatorRest.apiKey,
    'x-default-langcode': config.languages.defaultLangCode,
  },
});

export const gachaSimulatorRestOrigin = `http://${config.rest.gachaSimulatorRest.host}:${config.rest.gachaSimulatorRest.port}`;
