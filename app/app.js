import { Telegraf } from 'telegraf';

import config from '../config/index.js';
import events from './events/index.js';
import { client } from './modules/redis.js';

export default function main() {
  client.connect();
  const bot = new Telegraf(config.bot.API_TOKEN);
  bot.use(events);
  bot.startPolling();

  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));

  return bot;
}
