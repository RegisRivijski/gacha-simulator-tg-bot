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

  const notificationCrons = crons.filter((cron) => cron.type === NOTIFICATION_CRON_TYPE);
  const analyticCrons = crons.filter((cron) => cron.type === ANALYTICS_CRON_TYPE);
  const advertisementCrons = crons.filter((cron) => cron.type === ADVERTISEMENT_CRON_TYPE);

  await initCronQueue({
    bot,
    crons: notificationCrons,
  });
  console.info('Crons type=NOTIFICATION_CRON_TYPE are initialized!');
  await initCronQueue({
    bot,
    crons: analyticCrons,
  });
  console.info('Crons type=ANALYTICS_CRON_TYPE are initialized!');
  await initCronQueue({
    bot,
    crons: advertisementCrons,
  });
  console.info('Crons type=ADVERTISEMENT_CRON_TYPE are initialized!');
}
