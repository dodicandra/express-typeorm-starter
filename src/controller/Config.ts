import {Request, Response} from 'express';

import {AppDataSource} from '../data-source';
import {Config} from '../entity';

export class ConfigController {
  private repository = AppDataSource.getRepository(Config);
  static repository = AppDataSource.getRepository(Config);

  async getDate(request: Request, response: Response) {
    const data = await this.repository.createQueryBuilder('c').orderBy('c.createdAt', 'DESC').getOne();

    return response.json({data});
  }

  async setDate(request: Request<any, any, {date: number}>, response: Response) {
    const body = request.body;

    const config = Object.assign<Config, Config>(new Config(), {date: body.date});

    const data = await this.repository.save(config);

    return response.json({data});
  }
}
