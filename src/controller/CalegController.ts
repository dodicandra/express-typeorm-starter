import {Request, Response} from 'express';

import {AppDataSource} from '../data-source';
import {Caleg} from '../entity';

export class CalegController {
  private repository = AppDataSource.getRepository(Caleg);
  static repository = AppDataSource.getRepository(Caleg);

  async all(request: Request, response: Response) {
    const data = await this.repository.find();
    return response.json(data);
  }

  async save(request: Request<any, any, {name: string}>, response: Response) {
    const body = request.body;

    const user = Object.assign<Caleg, Caleg>(new Caleg(), {name: body.name});

    const res = await this.repository.save(user);

    return response.json({message: 'caleg saved', data: res});
  }
}
