import {Request, Response} from 'express';

import {AppDataSource} from '../data-source';
import {BlockUser, VoterSuperVisor} from '../entity';

export class BlockController {
  private repository = AppDataSource.getRepository(BlockUser);
  private userRepo = AppDataSource.getRepository(VoterSuperVisor);

  async get(request: Request<{email: string}, any>, response: Response) {
    const body = request.params;
    const data = await this.repository.findOne({where: {user: {email: body.email}}});
    if (!data) return response.status(400).json({message: 'user block not found'});
    return response.json(data);
  }

  async save(request: Request<any, any, {user_email: string}>, response: Response) {
    const userEmail = request.body.user_email;

    const user = await this.userRepo.findOne({where: {email: userEmail}});
    if (!user) {
      return response.status(400).json({message: 'user not found'});
    }
    const userBlocked = Object.assign<BlockUser, BlockUser>(new BlockUser(), {blocked: true, user});

    const res = await this.repository.save(userBlocked);
    await this.userRepo.update({email: user.email}, {hasBlocked: res});

    return response.json({message: 'user has been block', data: res});
  }

  async update(request: Request<{email: string}, any, {block: boolean}>, response: Response) {
    const body = request.body;
    const params = request.params;
    // cek user blocked
    const userBlocked = await this.repository.findOne({where: {user: {email: params.email}}});

    if (!userBlocked) {
      const user = await this.userRepo.findOne({where: {email: params.email}});
      if (!user) {
        return response.status(400).json({message: 'user not found'});
      }
      const userBlocked = Object.assign<BlockUser, BlockUser>(new BlockUser(), {blocked: body.block, user});

      const res = await this.repository.save(userBlocked);
      await this.userRepo.update({email: user.email}, {hasBlocked: res});
      return response.json({message: 'add new user blocked', data: res});
    }

    const user = await this.userRepo.findOne({where: {email: request.params.email}, relations: {hasBlocked: true}});
    if (!user) return response.status(400).json({message: 'user not found'});
    const affected = await this.repository.update({id: user.hasBlocked?.id}, {blocked: body.block});

    return response.json({message: 'updated user blocked', data: affected});
  }
}
