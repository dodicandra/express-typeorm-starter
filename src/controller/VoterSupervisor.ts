import {Request, Response} from 'express';

import {AppDataSource} from '../data-source';
import {VoterSuperVisor} from '../entity';

interface Payload {
  name: string;
  email: string;
  password: string;
}

export class VoterSupervisorController {
  private repository = AppDataSource.getRepository(VoterSuperVisor);
  static repository = AppDataSource.getRepository(VoterSuperVisor);

  async all(request: Request, response: Response) {
    const data = await this.repository.find({select: {email: true, id: true, name: true, voter: true}});
    return response.json({data});
  }

  async save(request: Request<any, any, Payload>, response: Response) {
    const body = request.body;

    const user = Object.assign<VoterSuperVisor, VoterSuperVisor>(new VoterSuperVisor(), body);

    const res = await this.repository.save(user);

    return response.json({message: 'supervisor saved', data: res});
  }

  async login(request: Request<any, any, {email: string; password: string}>, response: Response) {
    const data = request.body;
    const user = await this.repository.findOne({
      where: {email: data.email, password: data.password},
    });

    if (!user) {
      return response.status(400).json({message: 'supervisor not registered'});
    }

    response.cookie('supervisor_token', `${user.email}:${user.password}`, {httpOnly: true});
    return response.json({message: 'loggedin success', token: `${user.email}:${user.password}`});
  }
}
