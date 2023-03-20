import express from 'express';
import {
  ExpressAdapter,
  createBullBoard,
  BullAdapter,
} from '@bull-board/express';

import {
  notificationQueue,
  analyticsQueue,
} from '../cron/modules/queue.js';

import config from '../config/index.js';

export default function main() {
  const { basePath } = config.server;
  const serverAdapter = new ExpressAdapter();
  const app = express();

  serverAdapter.setBasePath(basePath);

  createBullBoard({
    queues: [
      new BullAdapter(notificationQueue),
      new BullAdapter(analyticsQueue),
    ],
    serverAdapter,
  });

  app.use(basePath, serverAdapter.getRouter());

  app.listen(config.server.port, () => {
    console.info(`Running on ${config.server.port}...`);
    console.info(`For the @bull-board UI, open http://${config.server.ip}:${config.server.port}${basePath}`);
  });
}
