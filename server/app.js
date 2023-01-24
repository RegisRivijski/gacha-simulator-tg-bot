import express from 'express';
import {
  ExpressAdapter,
  createBullBoard,
  BullAdapter,
} from '@bull-board/express';

import config from '../config/index.js';
import { queue } from '../cron/modules/queue.js';

export default function main() {
  const basePath = '/admin/queues';
  const serverAdapter = new ExpressAdapter();
  const app = express();

  serverAdapter.setBasePath(basePath);

  createBullBoard({
    queues: [new BullAdapter(queue)],
    serverAdapter,
  });

  app.use(basePath, serverAdapter.getRouter());

  app.listen(config.server.port, () => {
    console.info(`Running on ${config.server.port}...`);
    console.info(`For the @bull-board UI, open http://localhost:${config.server.port}${basePath}`);
  });
}
