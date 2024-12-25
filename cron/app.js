import {
  NOTIFICATION_CRON_TYPE,
  ANALYTICS_CRON_TYPE,
  ADVERTISEMENT_CRON_TYPE,
} from './constants/index.js';

import agenda from './modules/agenda.js';

import crons from './crons/index.js';
import initCronQueue from './helpers/initCronQueue.js';

export default async function main(bot) {
  await agenda.start();

  initCronQueue({
    bot,
    crons: crons.filter((cron) => cron.type === NOTIFICATION_CRON_TYPE),
  });
  initCronQueue({
    bot,
    crons: crons.filter((cron) => cron.type === ANALYTICS_CRON_TYPE),
  });
  initCronQueue({
    bot,
    crons: crons.filter((cron) => cron.type === ADVERTISEMENT_CRON_TYPE),
  });
}
