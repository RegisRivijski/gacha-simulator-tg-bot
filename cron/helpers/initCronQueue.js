export default function initCronQueue({
  bot,
  queue,
  crons,
}) {
  queue.process(async (job, done) => {
    const jobId = job?.opts?.repeat?.jobId;
    const cron = crons.find((data) => data.id === jobId);
    if (cron) {
      console.info('[INFO]', jobId, 'is started');
      await cron.process(bot)(job, done)
        .then(() => {
          console.info('[INFO]', jobId, 'is finished');
        });
    } else {
      console.warn('[WARN]', jobId, 'is not found');
    }
  });

  for (const cron of crons) {
    const cronConfig = {
      id: cron.id,
      type: cron.type,
      schedule: cron.schedule,
    };

    const cronData = {
      jobId: cron.id,
      removeOnComplete: true,
      repeat: {
        cron: cron.schedule,
      },
    };

    queue.add(cronConfig, cronData);
  }
}
