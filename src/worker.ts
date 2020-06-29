import { CronJob } from 'cron';
import extractor from './extractor';

extractor.run();
// const job = new CronJob('* * * * *', extractor.run);
// job.start();
