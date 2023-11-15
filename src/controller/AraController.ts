import {Request, Response} from 'express';
import {Like} from 'typeorm';

import {AppDataSource} from '../data-source';
import {Kecamatan, Kelurahan, Tps} from '../entity';

export class AreaController {
  private repository = {
    kelurahan: AppDataSource.getRepository(Kelurahan),
    kecamatan: AppDataSource.getRepository(Kecamatan),
    tps: AppDataSource.getRepository(Tps),
  };

  static repository = {
    kelurahan: AppDataSource.getRepository(Kelurahan),
    kecamatan: AppDataSource.getRepository(Kecamatan),
    tps: AppDataSource.getRepository(Tps),
  };

  //#region kecamatan
  async allKecamatan(request: Request<any, any, any, {search: string}>, response: Response) {
    const where = request.query.search ? {name: Like(`%${request.query.search}%`)} : {};
    const data = await this.repository.kecamatan.find({where, select: {id: true, name: true}});
    return response.json({data});
  }

  async saveKecamatan(request: Request<any, any, {name: string}>, response: Response) {
    const body = request.body;

    const user = Object.assign<Kecamatan, Kecamatan>(new Kecamatan(), {name: body.name});

    const res = await this.repository.kecamatan.save(user);

    return response.json({message: 'Kecamatan saved', data: res});
  }

  async bulksaveKecamatan(request: Request<any, any, {name: string}[]>, response: Response) {
    const body = request.body;

    const res = await this.repository.kecamatan.save(body);

    return response.json({message: 'Kecamatan saved', data: res});
  }
  //#endregion

  //#region kelurahan
  async allKelurahan(request: Request<any, any, any, {search: string}>, response: Response) {
    const where = request.query.search ? {name: Like(`%${request.query.search}%`)} : {};

    const data = await this.repository.kelurahan.find({where, select: {id: true, name: true}});
    return response.json({data});
  }

  async saveKelurahan(request: Request<any, any, {name: string}>, response: Response) {
    const body = request.body;

    const user = Object.assign<Kelurahan, Kelurahan>(new Kelurahan(), {name: body.name});

    const res = await this.repository.kelurahan.save(user);

    return response.json({message: 'Kelurahan saved', data: res});
  }

  async bulksaveKelurahan(request: Request<any, any, {name: string}[]>, response: Response) {
    const body = request.body;

    const res = await this.repository.kelurahan.save(body);

    return response.json({message: 'Kelurahan saved', data: res});
  }
  //#endregion

  //#region tps
  async allTps(request: Request<any, any, any, {number: string; kelurahan: string}>, response: Response) {
    const queryWhere = Object.entries(request.query)
      .map(([key, value]) => ({
        [key]: Like(value),
      }))
      .reduce((acc, curr) => {
        return Object.assign(acc, curr);
      }, {});

    const where = request.query ? queryWhere : {};
    const data = await this.repository.tps.find({where, select: {id: true, number: true, kelurahan: true}});
    return response.json({data});
  }

  async saveTps(request: Request<any, any, {number: string; kelurahan: string}>, response: Response) {
    const body = request.body;

    const user = Object.assign<Tps, Tps>(new Tps(), body);

    const res = await this.repository.tps.save(user);

    return response.json({message: 'TPS saved', data: res});
  }

  async bulksaveTps(request: Request<any, any, {number: string}[]>, response: Response) {
    const body = request.body;

    const res = await this.repository.tps.save(body);

    return response.json({message: 'TPS saved', data: res});
  }
  //#endregion
}
