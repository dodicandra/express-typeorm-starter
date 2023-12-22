import {Request, Response} from 'express';
import {Equal} from 'typeorm';

import {cookieOptions} from '../constants/cookie';
import {AppDataSource} from '../data-source';
import {User} from '../entity/User';

export class UserController {
  private repository = AppDataSource.getRepository(User);

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

  async save(request: Request<any, any, User>, response: Response) {
    const {name, password, role} = request.body;

    const user = Object.assign<User, User>(new User(), {name, password, role});

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

  async login(request: Request<any, any, {name: string; password: string}>, response: Response) {
    const data = request.body;
    const user = await this.repository.findOne({
      where: {name: Equal(data.name), password: Equal(data.password)},
    });

    if (!user) {
      return response.status(400).json({message: 'user not registered'});
    }

    return response
      .cookie('user_admin_token', `${user.name}:${user.password}:${user.role}`, cookieOptions)
      .json({message: 'loggedin success', token: `${user.name}:${user.password}:${user.role}`});
  }

  async logout(request: Request, response: Response) {
    return response
      .clearCookie('user_admin_token', cookieOptions)
      .clearCookie('supervisor_token', cookieOptions)
      .json({message: 'success'});
  }
}
