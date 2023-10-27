import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';

import {PORT} from './config';
import {AppDataSource} from './data-source';
import {Routes} from './routes';

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use('/uploads', express.static('uploads'));

    // register express routes from defined application routes
    Routes.forEach((route) => {
      app.use(route);
    });

    // setup express app here
    // ...

    // start express server
    app.listen(PORT);

    console.log(`Express server has started on port 3000. Open http://localhost:${PORT} to see results`);
  })
  .catch((error) => console.log(error));
