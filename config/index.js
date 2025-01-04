import packageJson from '../package.json' assert { type: 'json' };

export default {
  application: {
    name: packageJson.name,
    version: packageJson.version,
  },
  environment: {
    name: process.env.NODE_ENV,
    test: process.env.NODE_ENV === 'dev',
  },
  telegramBotApi: {
    protocol: process.env.TELEGRAM_BOT_API_PROTOCOL,
    host: process.env.TELEGRAM_BOT_API_HOST,
    port: process.env.TELEGRAM_BOT_API_PORT,
  },
  languages: {
    defaultLangCode: process.env.DEFAULT_LANGUAGE_CODE,
  },
  bot: {
    API_TOKEN: process.env.GACHA_SIMULATOR_TG_BOT_API_TOKEN,
  },
  db: {
    redis: {
      url: process.env.REDIS_URL,
      host: process.env.REDIS_HOSTNAME,
      port: process.env.REDIS_PORT,
      // password: process.env.REDIS_PASSWORD,
    },
    mongodbAgenda: {
      url: process.env.MONGODB_GENSHIN_AGENDA_URI,
      options: {
        dbName: 'agenda',
      },
    },
  },
  rest: {
    gachaSimulatorRest: {
      apiKey: process.env.GACHA_SIMULATOR_REST_API_KEY,
      port: process.env.GACHA_SIMULATOR_REST_PORT,
      host: process.env.GACHA_SIMULATOR_REST_HOST,
    },
  },
};
