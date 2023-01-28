import {
  NOTIFICATION_CRON_TYPE,
  PRIMOGEMS_LIMIT_CRON_NAME,
  HOW_MANY_USER_CAN_BUY_CRON_NAME,
} from '../constants/index.js';

import * as notificationController from '../controllers/notificationController.js';

export default [
  {
    id: PRIMOGEMS_LIMIT_CRON_NAME,
    type: NOTIFICATION_CRON_TYPE,
    schedule: '15 9 * * *',
    process: (bot) => notificationController.primogemsLimit(bot),
  },
  {
    id: HOW_MANY_USER_CAN_BUY_CRON_NAME,
    type: NOTIFICATION_CRON_TYPE,
    schedule: '10 19 */3 * *',
    process: (bot) => notificationController.howManyUserCanBuy(bot),
  },
];
