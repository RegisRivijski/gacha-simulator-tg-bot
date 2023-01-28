import {
  NOTIFICATION_CRON_TYPE,
  ANALYTICS_CRON_TYPE,
} from './constants/index.js';

import crons from './crons/index.js';
import initCronQueue from './helpers/initCronQueue.js';

import * as queues from './modules/queue.js';

export default function main(bot) {
  initCronQueue({
    bot,
    queue: queues.notificationQueue,
    crons: crons.filter((cron) => cron.type === NOTIFICATION_CRON_TYPE),
  });
  initCronQueue({
    bot,
    queue: queues.analyticsQueue,
    crons: crons.filter((cron) => cron.type === ANALYTICS_CRON_TYPE),
  });
}
