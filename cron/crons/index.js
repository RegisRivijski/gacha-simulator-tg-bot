import {
  NOTIFICATION_CRON_TYPE,
  ANALYTICS_CRON_TYPE,
  ADVERTISEMENT_CRON_TYPE,

  PRIMOGEMS_LIMIT_CRON_NAME,
  CONFIGURE_NOTIFICATION_CRON_NAME,
  ADVERTISEMENT_CRON_NAME,
} from '../constants/index.js';

import * as notificationController from '../controllers/notificationController.js';
import * as analyticsController from '../controllers/analyticsController.js';
import * as advertisementsControllers from '../controllers/advertisementController.js';

export default [
  {
    name: PRIMOGEMS_LIMIT_CRON_NAME,
    type: NOTIFICATION_CRON_TYPE,
    schedule: '15 7 * * *',
    process: (bot) => notificationController.primogemsLimit(bot),
  },
  {
    name: CONFIGURE_NOTIFICATION_CRON_NAME,
    type: ANALYTICS_CRON_TYPE,
    schedule: '0 0 * * *',
    process: (bot) => analyticsController.congifugureNotification(bot),
  },
  {
    name: ADVERTISEMENT_CRON_NAME,
    type: ADVERTISEMENT_CRON_TYPE,
    schedule: '* * * * *',
    process: (bot) => advertisementsControllers.advertisementWorker(bot),
  },
];
