import config from './config/index.js';

import app from './app/app.js';
import appCron from './cron/app.js';
import appServer from './server/app.js';

const bot = app();
appCron(bot);

if (config.server.enable) {
  appServer();
}
