import {Response} from 'express';

export function isPromiseResponse(result: unknown): result is Promise<Response<any, Record<string, any>>> {
  return result instanceof Promise;
}

export function isExpressResponse(res: any): res is Response {
  return res !== 'ok';
}
