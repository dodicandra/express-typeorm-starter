import * as express from 'express';
import {NextFunction, Request, Response} from 'express';

import {isExpressResponse, isPromiseResponse} from './ify';

type ObjectType<T> = {
  new (): T;
};

interface RouterParams<T> {
  method: 'get' | 'post' | 'delete' | 'put';
  route: string;
  controller: ObjectType<T>;
  action: keyof T;
  middleWare?: express.RequestHandler[];
}

export function createRoutes<T extends Record<string, any>>(params: RouterParams<T>[]) {
  const routes = express.Router();
  params.forEach((route) => {
    const nextFunc = (req: Request<unknown>, res: Response<unknown>, next: NextFunction) => {
      const result = new route.controller()[route.action](req, res, next);
      if (isPromiseResponse(result)) {
        result.then((result) =>
          result !== null && result !== undefined && isExpressResponse(result)
            ? result.end()
            : res.status(500).json({message: 'controller not return express Response'}),
        );
      } else {
        res.status(500).json({message: 'controller not same'});
      }
    };
    const params = route.middleWare ? [...route.middleWare, nextFunc] : [nextFunc];
    routes[route.method](route.route, ...params);
  });
  return routes;
}
