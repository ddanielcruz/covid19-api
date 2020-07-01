import { CronJob } from 'cron';
import Extractor from '@services/Extractor';

export const configureWorker = () => {
  // In case it's not informed it will run by default
  const runOnInt = process.env.WORKER_RUN_ON_INIT || 'true';

  const job = new CronJob({
    cronTime: process.env.WORKER_INTERVAL || '0 * * * *',
    onTick: Extractor.run,
    runOnInit: runOnInt === 'true',
  });

  job.start();
};
