import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {config} from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import {PORT} from './config';
import {AppDataSource} from './data-source';
import {Routes} from './routes';

config();

const whitelist = [
  'http://192.168.1.4:3000',
  'http://localhost:3000',
  'http://localhost:4000',
  'https://rikahanom.com',
  'https://www.rikahanom.com',
  'https://*.rikahanom.com',
];

const corsOptions: cors.CorsOptions = {
  origin: (origin = '', callback) => {
    console.log('visited :', origin);
    const check = whitelist.indexOf(origin);
    if (check !== -1) {
      callback(null, true);
    } else {
      callback(null);
    }
  },
  credentials: true,
};

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();

    app.use(cors(corsOptions));
    app.use(cookieParser());
    app.use(bodyParser.json({limit: '500mb'}));
    app.use(bodyParser.text({limit: '500mb'}));
    app.use(bodyParser.urlencoded({extended: true, limit: '500mb'}));
    app.use('/uploads', express.static('uploads'));
    app.use(
      morgan(
        ':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length]',
        {
          skip: function (req, res) {
            return res.statusCode < 400;
          },
        },
      ),
    );
    // register express routes from defined application routes
    Routes.forEach((route) => {
      app.use(route);
    });

    // setup express app here
    // ...

    // start express server
    app.listen(PORT);

    console.log(`Express server has started on port ${PORT}. Open http://localhost:${PORT} to see results`);
  })
  .catch((error) => console.log(error));
