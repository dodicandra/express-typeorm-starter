import {Request, Response} from 'express';
import {Equal} from 'typeorm';

import {AppDataSource} from '../data-source';
import {UserVote} from '../entity/UserVote';
import {UserVoteMasterDataController} from './UserVoteMasterDataController';
import {VoterSupervisorController} from './VoterSupervisor';

export class UserVoteController {
  private repository = AppDataSource.getRepository(UserVote);

  async all(request: Request<any, any, any, UserVote>, response: Response) {
    const query = request.query;
    const where = query
      ? Object.entries(query)
          .map(([key, value]) => ({
            [key]: `%${value}%`,
          }))
          .reduce((acc, curr) => {
            return Object.assign(acc, curr);
          }, {})
      : {};
    console.log(where);
    const data = await this.repository.find({where});
    const count = await this.repository.count({where});
    return response.json({data, count});
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

  async save(request: Request<any, any, UserVote>, response: Response) {
    const body = request.body;
    const token = request.cookies.supervisor_token;
    const spEmail = token?.split(':')[0] ?? '';
    const spPass = token?.split(':')[1] ?? '';

    const supervisor = await VoterSupervisorController.repository.findOne({
      where: {email: Equal(spEmail), password: Equal(spPass)},
    });

    if (!supervisor) {
      return response.status(500).json({message: 'supervisor tidak ada'});
    }

    const user = Object.assign<UserVote, UserVote>(new UserVote(), {...body, supervisor});
    await UserVoteMasterDataController.repository.update({id: body.id}, {reservased: true});
    const res = await this.repository.save(user);

    return response.json({message: 'user saved', data: res});
  }

  async bulksave(request: Request<any, any, UserVote[]>, response: Response) {
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
