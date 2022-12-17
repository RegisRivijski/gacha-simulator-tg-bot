import cron from 'node-cron';

import * as notificationController from './controllers/notificationController.js';

export default function main(bot) {
  cron.schedule('15 9 * * *', notificationController.primogemsLimit(bot));
  cron.schedule('10 19 */3 * *', notificationController.howManyUserCanBuy(bot));
}
