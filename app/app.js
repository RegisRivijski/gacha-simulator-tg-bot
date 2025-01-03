import { Telegraf } from 'telegraf';

import config from '../config/index.js';
import events from './routers/index.js';
import { client } from './modules/redis.js';

export default function main() {
  client.connect();
  const bot = new Telegraf(config.bot.API_TOKEN, {
    telegram: {
      apiRoot: `${config.telegramBotApi.protocol}//${config.telegramBotApi.host}:${config.telegramBotApi.port}`,
      testEnv: config.environment.test,
    },
  });
  bot.use(events);
  bot.startPolling();

  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));

  console.table({
    Application: config.application.name,
    Version: config.application.version,
  });

  return bot;
}
