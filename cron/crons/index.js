import {
  PRIMOGEMS_LIMIT_CRON_NAME,
  HOW_MANY_USER_CAN_BUY_CRON_NAME,
} from '../constants/index.js';

import * as notificationController from '../controllers/notificationController.js';

export default [
  {
    id: PRIMOGEMS_LIMIT_CRON_NAME,
    schedule: '15 9 * * *',
    process: (bot) => notificationController.primogemsLimit(bot),
    data: {},
  },
  {
    id: HOW_MANY_USER_CAN_BUY_CRON_NAME,
    schedule: '10 19 */3 * *',
    process: (bot) => notificationController.howManyUserCanBuy(bot),
    data: {},
  },
];
