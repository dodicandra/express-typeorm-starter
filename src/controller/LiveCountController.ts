import {Request, Response} from 'express';
import {Equal} from 'typeorm';

import {AppDataSource} from '../data-source';
import {Photo} from '../entity';
import {LiveCount} from '../entity/LiveCount';
import {UserWitnessController} from './WitnessController';

interface LiveCountSave {
  caleg: string;
  count: number;
  photo: string[];
}

export class LiveCountController {
  private repository = AppDataSource.getRepository(LiveCount);

  async all(request: Request, response: Response) {
    const data = await this.repository.find({relations: {userWitness: true, userWitnessPhoto: true}});
    return response.json(data);
  }

  async one(request: Request<{id: string}>, response: Response) {
    const id = parseInt(request.params.id);
    try {
      if (isNaN(id)) throw new Error('parameters not a number');

      const user = await this.repository.findOne({
        where: {id},
        relations: {userWitness: true},
      });

      if (!user) {
        return response.status(200).json({message: 'no user found'});
      }
      return response.json(user);
    } catch (error) {
      return response.status(500).json({message: error.message});
    }
  }

  async save(request: Request<any, any, LiveCountSave>, response: Response) {
    const {caleg, photo, count} = request.body;
    const loggedUser = request.cookies;

    const userWitness = await UserWitnessController.repository.findOne({where: {name: loggedUser.user_name}});

    const lastInsert = await this.repository.count({where: {name: caleg, userWitness: {name: userWitness.name}}});

    if (lastInsert > 0) {
      return response.status(500).json({message: 'you already votes'});
    }

    const p1 = new Photo();
    p1.path = photo[0];
    await AppDataSource.manager.save(p1);
    const p2 = new Photo();
    p2.path = photo[1];
    await AppDataSource.manager.save(p2);

    const votes = new LiveCount();
    votes.name = caleg;
    votes.count = count;
    votes.userWitness = userWitness;
    votes.userWitnessPhoto = [p1, p2];

    const res = await this.repository.save(votes);

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

  async getCalegCount(request: Request<{name: string}>, response: Response) {
    const param = request.params;
    const countData = await this.repository.find({
      where: {name: Equal(param.name)},
      relations: {userWitness: true, userWitnessPhoto: true},
    });

    const count = countData.reduce((prev, curr) => {
      const num = prev + curr.count;
      return num;
    }, 0);

    return response.json({data: {count, data: countData}});
  }
}
