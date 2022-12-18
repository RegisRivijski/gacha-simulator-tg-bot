import { Telegraf } from 'telegraf';

import config from '../config/index.js';
import { commands, actions } from './events/index.js';

export default function main() {
  const bot = new Telegraf(config.bot.API_TOKEN);
  bot.use(commands);
  bot.use(actions);
  bot.startPolling();

  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));

  return bot;
}
