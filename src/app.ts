import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import routes from './routes';
import logger from '@config/logger';
import { createMongoUrl } from '@config/mongo';
import { configureWorker } from '@config/worker';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();

    this.middleware();
    this.database();
    this.routes();
    configureWorker();
  }

  middleware() {
    this.express.use(logger());
    this.express.use(cors());
    this.express.use(express.json());
  }

  database() {
    mongoose.connect(createMongoUrl(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  }

  routes() {
    this.express.use(routes);
  }
}

export default new App().express;
