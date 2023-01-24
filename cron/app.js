import Queue from 'bull';

import config from '../config/index.js';
import crons from './crons/index.js';

const queue = new Queue('repeater', {
  redis: config.db.redis,
});

export default function main(bot) {
  queue.process((job) => {
    const cron = crons.find((data) => data.id === job.id);
    if (cron) {
      console.info('[INFO]', job.id, 'is started');
      cron.process(bot)
        .then(() => {
          console.info('[INFO]', job.id, 'is finished');
        });
    } else {
      console.warn('[WARN]', job.id, 'is not found');
    }
  });

  for (const cron of crons) {
    queue.add(null, {
      jobId: cron.id,
      removeOnComplete: true,
      repeat: {
        cron: cron.schedule,
      },
    });
  }
}
