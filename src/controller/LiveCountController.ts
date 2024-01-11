import {Request, Response} from 'express';
import {Equal} from 'typeorm';

import {AppDataSource} from '../data-source';
import {Photo} from '../entity';
import {LiveCount} from '../entity/LiveCount';
import {CalegController} from './CalegController';
import {PhotoController} from './PhotoController';
import {UserWitnessController} from './WitnessController';

interface LiveCountSave {
  caleg: string;
  count: number;
  tps: string;
  kelurahan: string;
}

interface LiveCountEdit {
  id: number;
  calegId: number;
  count: number;
  witnessEmail: number;
}

interface UploadImageData {
  caleg_teli: Express.Multer.File[];
  total_caleg_teli: Express.Multer.File[];
  total_teli: Express.Multer.File[];
  ri_teli: Express.Multer.File[];
  [key: string]: Express.Multer.File[];
}

export class LiveCountController {
  private repository = AppDataSource.getRepository(LiveCount);

  async all(request: Request, response: Response) {
    const data = await this.repository.find({
      relations: {userWitness: true, userWitnessPhoto: {userWitenss: true}, caleg: true},
    });
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
      return response.status(500).json({message: (error as any).message});
    }
  }

  async save(request: Request<any, any, LiveCountSave>, response: Response) {
    const {caleg, count, tps, kelurahan} = request.body;
    const userEmail = request.app.locals.user_witness_token.email ?? '';
    const files = request?.files as unknown as UploadImageData;
    const userWitness = await UserWitnessController.repository.findOne({
      where: {email: Equal(userEmail)},
    });

    if (!userWitness) {
      return response.status(500).json({message: 'user saksi tidak ada'});
    }

    const arrayPhoto: Photo[] = [];

    for (const [key, value] of Object.entries(files)) {
      const p = new Photo();
      p.filed = key;
      p.path = value[0].filename;
      p.userWitenss = userWitness;
      arrayPhoto.push(p);
    }

    const calegs = await CalegController.repository.findOne({where: {name: Equal(caleg)}});

    if (!calegs) {
      return response.status(500).json({message: 'caleg not found'});
    }

    const votes = new LiveCount();
    votes.count = count;
    votes.userWitness = userWitness;
    votes.userWitnessPhoto = arrayPhoto;
    votes.caleg = calegs;
    votes.tps = tps;
    votes.kelurahan = kelurahan;

    try {
      for (const iterator of arrayPhoto) {
        await AppDataSource.manager.save(iterator);
      }
      console.log(votes);
      const res = await this.repository.save(votes);

      return response.json({message: 'user saved', data: res});
    } catch (error) {
      return response.status(500).json({message: (error as any).message});
    }
  }

  async edit(request: Request<{id: string}, any, LiveCountEdit>, response: Response) {
    const id = Number(request.params.id);
    const body = request.body;
    const images = request.files as unknown as UploadImageData;
    const data = await this.repository.findOne({where: {id}, relations: {userWitnessPhoto: true}});

    if (!data) {
      return response.status(500).json({message: 'data not found'});
    }

    data.count = body.count;

    if (data.userWitnessPhoto) {
      data.userWitnessPhoto.map((it) => {
        if (Object.keys(images).length) it.path = images[it.filed][0].filename;
      });
    }

    await this.repository.save(data);

    if (data.userWitnessPhoto) {
      await Promise.all(data.userWitnessPhoto.map((it) => PhotoController.repository.save(it)));
    }

    const dataUpdated = await this.repository.findOne({
      where: {id: data.id},
      relations: {caleg: true, userWitnessPhoto: true},
    });

    return response.json({data: dataUpdated});
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
      where: {caleg: {name: Equal(param.name)}},
      relations: {userWitness: {vote: false}, userWitnessPhoto: {userWitenss: true}},
    });

    const count = countData.reduce((prev, curr) => {
      const num = prev + curr.count;
      return num;
    }, 0);

    return response.json({data: {count, data: countData}});
  }

  async getTotalVotes(request: Request, response: Response) {
    try {
      const query = 'SUM("caleg_count")';

      const count = await this.repository.createQueryBuilder().select(query, 'votes').getRawOne();

      return response.json({data: count});
    } catch (error) {
      const message = (error as any).message;
      return response.status(500).json({message});
    }
  }
}
