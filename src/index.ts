import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';

import {AppDataSource} from './data-source';
import {Routes} from './routes';

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(express.static('uploads'));

    // register express routes from defined application routes
    Routes.forEach((route) => {
      app.use(route);
    });

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    console.log('Express server has started on port 3000. Open http://localhost:3000/users to see results');
  })
  .catch((error) => console.log(error));
