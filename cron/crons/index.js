import {
  NOTIFICATION_CRON_TYPE,
  ANALYTICS_CRON_TYPE,

  PRIMOGEMS_LIMIT_CRON_NAME,
  HOW_MANY_USER_CAN_BUY_CRON_NAME,
  CONFIGURE_NOTIFICATION_CRON_NAME,
} from '../constants/index.js';

import * as notificationController from '../controllers/notificationController.js';
import * as analyticsController from '../controllers/analyticsController.js';

export default [
  {
    id: PRIMOGEMS_LIMIT_CRON_NAME,
    type: NOTIFICATION_CRON_TYPE,
    schedule: '15 7 * * *',
    process: (bot) => notificationController.primogemsLimit(bot),
  },
  {
    id: CONFIGURE_NOTIFICATION_CRON_NAME,
    type: ANALYTICS_CRON_TYPE,
    schedule: '0 0 * * *',
    process: (bot) => analyticsController.congifugureNotification(bot),
  },
];
