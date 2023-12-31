import {Request, Response} from 'express';

import {AppDataSource} from '../data-source';
import {User} from '../entity/User';

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response) {
    const data = await this.userRepository.find();
    return response.json(data);
  }

  async one(request: Request<{id: string}>, response: Response) {
    const id = parseInt(request.params.id);
    try {
      if (isNaN(id)) throw new Error('parameters not a number');

      const user = await this.userRepository.findOne({
        where: {id},
      });

      if (!user) {
        return response.status(200).json({message: 'no user found'});
      }
      return response.json(user);
    } catch (error) {
      return response.status(500).json({message: error.message});
    }
  }

  async save(request: Request<any, any, User>, response: Response) {
    const {firstName, lastName, age} = request.body;

    const user = Object.assign(new User(), {
      firstName,
      lastName,
      age,
    });

    const res = await this.userRepository.save(user);

    return response.json({message: 'user saved', data: res});
  }

  async remove(request: Request, response: Response) {
    const id = parseInt(request.params.id);

    const userToRemove = await this.userRepository.findOneBy({id});

    if (!userToRemove) {
      return response.status(500).json({message: 'user not exist'});
    }

    await this.userRepository.remove(userToRemove);

    return response.json({message: 'user has been removed'});
  }

  async test() {
    return 'ok';
  }
}
