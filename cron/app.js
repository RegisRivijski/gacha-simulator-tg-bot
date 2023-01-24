import crons from './crons/index.js';
import { queue } from './modules/queue.js';

export default function main(bot) {
  queue.process((job) => {
    const jobId = job?.opts?.repeat?.jobId;
    const cron = crons.find((data) => data.id === jobId);
    if (cron) {
      console.info('[INFO]', jobId, 'is started');
      cron.process(bot)()
        .then(() => {
          console.info('[INFO]', jobId, 'is finished');
        });
    } else {
      console.warn('[WARN]', jobId, 'is not found');
    }
  });

  for (const cron of crons) {
    queue.add(cron.data, {
      jobId: cron.id,
      removeOnComplete: true,
      repeat: {
        cron: cron.schedule,
      },
    });
  }
}
