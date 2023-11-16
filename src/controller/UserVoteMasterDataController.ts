import {Request, Response} from 'express';
import {Like} from 'typeorm';

import {AppDataSource} from '../data-source';
import {UserVoteMasterData} from '../entity';

export class UserVoteMasterDataController {
  private repository = AppDataSource.getRepository(UserVoteMasterData);
  static repository = AppDataSource.getRepository(UserVoteMasterData);

  async all(request: Request<any, any, any, UserVoteMasterData>, response: Response) {
    const queryWhere = Object.entries(request.query)
      .map(([key, value]) => ({
        [key]: Like(value),
      }))
      .reduce((acc, curr) => {
        return Object.assign(acc, curr);
      }, {});

    const where = request.query ? queryWhere : {};
    const data = await this.repository.find({where: {...where, reservased: false}});
    return response.json({data});
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

  async save(request: Request<any, any, UserVoteMasterData>, response: Response) {
    const body = request.body;

    const user = Object.assign<UserVoteMasterData, UserVoteMasterData>(new UserVoteMasterData(), body);

    const res = await this.repository.save(user);

    return response.json({message: 'user saved', data: res});
  }

  async bulksave(request: Request<any, any, UserVoteMasterData[]>, response: Response) {
    const body = request.body;

    const res = await this.repository.save(body);

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
}
