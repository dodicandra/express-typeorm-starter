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
    const data = await this.repository.find();
    return response.json(data);
  }

  async save(request: Request<any, any, Payload>, response: Response) {
    const body = request.body;

    const user = Object.assign<VoterSuperVisor, VoterSuperVisor>(new VoterSuperVisor(), body);

    const res = await this.repository.save(user);

    return response.json({message: 'supervisor saved', data: res});
  }
}
