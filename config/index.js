import packageJson from '../package.json' assert { type: "json" };

export default {
  application: {
    name: packageJson.name,
    version: packageJson.version,
  },
  languages: {
    defaultLangCode: process.env.DEFAULT_LANGUAGE_CODE,
  },
  bot: {
    API_TOKEN: process.env.SANDBOX_TG_BOT_API_TOKEN,
  },
  rest: {
    gachaSimulatorRest: {
      port: process.env.GACHA_SIMULATOR_REST_PORT,
      host: process.env.GACHA_SIMULATOR_REST_HOST,
    },
  },
};
