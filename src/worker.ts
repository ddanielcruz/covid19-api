import { CronJob } from 'cron';
import extractor from './extractor';

const job = new CronJob({
  cronTime: '0 * * * *',
  onTick: extractor.run,
  runOnInit: true,
});
job.start();
