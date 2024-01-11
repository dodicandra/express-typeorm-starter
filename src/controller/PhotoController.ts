import {Request, Response} from 'express';

import {AppDataSource} from '../data-source';
import {Photo} from '../entity/Photo';

export class PhotoController {
  private repository = AppDataSource.getRepository(Photo);
  static repository = AppDataSource.getRepository(Photo);

  async all(request: Request, response: Response) {
    const data = await this.repository.find();
    return response.json(data);
  }

  async one(request: Request<{id: string}>, response: Response) {
    const id = parseInt(request.params.id);
    try {
      if (isNaN(id)) throw new Error('parameters not a number');

      const user = await this.repository.findOne({
        where: {id},
      });

      if (!user) {
        return response.status(200).json({message: 'no user found'});
      }
      return response.json(user);
    } catch (error) {
      return response.status(500).json({message: (error as any).message});
    }
  }

  async save(request: Request<any, any, Photo>, response: Response) {
    const {path, filed} = request.body;

    const user = Object.assign<Photo, Photo>(new Photo(), {path, filed});

    const res = await this.repository.save(user);

    return response.json({message: 'user saved', data: res});
  }

  async remove(request: Request, response: Response) {
    const id = parseInt(request.params.id);

    const userToRemove = await this.repository.findOneBy({id});

    if (!userToRemove) {
      return response.status(500).json({message: 'user not exist'});
    }

    await this.repository.remove(userToRemove);

    return response.json({message: 'user has been removed'});
  }

  async test() {
    return 'ok';
  }
}
