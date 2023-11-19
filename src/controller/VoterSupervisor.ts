import {Request, Response} from 'express';
import {Like} from 'typeorm';

import {cookieOptions} from '../contants/cookie';
import {AppDataSource} from '../data-source';
import {VoterSuperVisor} from '../entity';
import {UserVoteController} from './UserVoteController';

interface Payload {
  name: string;
  email: string;
  password: string;
}

export class VoterSupervisorController {
  private repository = AppDataSource.getRepository(VoterSuperVisor);
  static repository = AppDataSource.getRepository(VoterSuperVisor);

  async all(request: Request<any, any, any, {name: string}>, response: Response) {
    const data = await this.repository.find({
      select: {email: true, id: true, name: true, voter: true, password: true},
      relations: {voter: true},
      where: request.query.name ? {name: Like(request.query.name)} : undefined,
    });
    return response.json({data});
  }

  async save(request: Request<any, any, Payload>, response: Response) {
    const body = request.body;

    try {
      const user = Object.assign<VoterSuperVisor, VoterSuperVisor>(new VoterSuperVisor(), body);
      const res = await this.repository.save(user);
      return response.json({message: 'supervisor saved', data: res});
    } catch (error) {
      const err = error as {message?: string};
      return response.status(500).json({message: err.message?.includes('UNIQUE') ? 'user telah ada' : err.message});
    }
  }

  async login(request: Request<any, any, {email: string; password: string}>, response: Response) {
    const data = request.body;
    const user = await this.repository.findOne({
      where: {email: data.email, password: data.password},
    });

    if (!user) {
      return response.status(400).json({message: 'supervisor not registered'});
    }
    const token = `${user.email}:${user.password}:${user.name}`;

    response.cookie('supervisor_token', token, cookieOptions);
    return response.json({message: 'loggedin success', token});
  }

  async getCandidateCount(request: Request<any, any, any>, response: Response) {
    const user = request.cookies.supervisor_token;

    const email = user?.split(':')[0] ?? '';

    const data = await this.repository.findOne({where: {email}, relations: {voter: true}});
    const count = data?.voter?.length ?? 0;

    return response.json({count});
  }

  async getCandidate(request: Request<any, any, any, {id: string; name: string}>, response: Response) {
    const param = request.query;

    try {
      const data = await this.repository.findOne({
        where: {name: Like(param.name), id: Number(param.id)},
        relations: {voter: true},
        select: {voter: true},
      });

      if (!data?.voter?.length) {
        return response.json({data: []});
      }
      return response.json({data: data?.voter, count: data.voter.length});
    } catch (error) {
      const err = error as {message: string};
      return response.status(500).json({message: err.message ?? ''});
    }
  }

  async delete(request: Request<any, any, {id: number}>, response: Response) {
    const body = request.body;
    try {
      await UserVoteController.repository.delete({supervisor: {id: body.id}});
      await this.repository.delete({id: body.id});
      return response.json({message: 'success'});
    } catch (error) {
      const message = (error as {message: string}).message;
      return response.status(500).json({message});
    }
  }

  async edit(request: Request<any, any, VoterSuperVisor>, response: Response) {
    const body = request.body;
    try {
      const data = await this.repository.update({id: body.id}, body);
      return response.json({data});
    } catch (error) {
      console.log('🚀 ~ file: VoterSupervisor.ts:106 ~ VoterSupervisorController ~ edit ~ error:', error);
      const message = (error as {message: string}).message;
      return response.status(500).json({message});
    }
  }

  async deleteVoter(request: Request<any, any, {id: number}>, response: Response) {
    const body = request.body;
    try {
      const data = await UserVoteController.repository.delete({id: body.id});
      return response.json({message: 'success', data});
    } catch (error) {
      const message = (error as {message: string}).message;
      return response.status(500).json({message});
    }
  }
}
