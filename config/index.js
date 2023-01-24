import packageJson from '../package.json' assert { type: "json" };

export default {
  application: {
    name: packageJson.name,
    version: packageJson.version,
  },
  server: {
    port: process.env.BULL_BOARD_PORT,
  },
  languages: {
    defaultLangCode: process.env.DEFAULT_LANGUAGE_CODE,
  },
  bot: {
    API_TOKEN: process.env.SANDBOX_TG_BOT_API_TOKEN,
  },
  db: {
    redis: {
      url: process.env.REDIS_URL,
      host: process.env.REDIS_HOSTNAME,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
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
