import app from './app/app.js';
import appCron from './cron/app.js';

const bot = app();

appCron(bot);
