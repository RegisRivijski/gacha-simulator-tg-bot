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
    queue.add({
      id: cron.id,
      type: cron.type,
      schedule: cron.schedule,
    }, {
      jobId: cron.id,
      removeOnComplete: true,
      repeat: {
        cron: cron.schedule,
      },
    });
  }
}
