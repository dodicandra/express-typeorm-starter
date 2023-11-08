import {Request, Response} from 'express';

import {AppDataSource} from '../data-source';
import {UserWitness} from '../entity/Witness';

export class UserWitnessController {
  private repository = AppDataSource.getRepository(UserWitness);

  static repository = AppDataSource.getRepository(UserWitness);

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

  async save(request: Request<any, any, {name: string; email: string}>, response: Response) {
    const body = request.body;
    try {
      const user = Object.assign<UserWitness, UserWitness>(new UserWitness(), body);

      const res = await this.repository.save(user);
      return response.json({message: 'user saved', data: res});
    } catch (error) {
      return response.status(500).json({message: (error as any).message});
    }
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

  async login(request: Request<any, any, {email: string}>, response: Response) {
    const data = request.body;
    const user = await this.repository.findOne({
      where: {email: data.email},
    });

    if (!user) {
      return response.status(400).json({message: 'user not registered'});
    }

    response.cookie('user_witness_email', user.email, {httpOnly: true});
    response.cookie('user_witness_id', user.id, {httpOnly: true});
    return response.json({message: 'loggedin success'});
  }
}
