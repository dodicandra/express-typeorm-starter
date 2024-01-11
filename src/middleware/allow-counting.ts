import {NextFunction, Request, Response} from 'express';

import {AppDataSource} from '../data-source';
import {Config} from '../entity';
import {Dayjs} from '../lib/dayjs';

export async function allowCount(request: Request, response: Response, next: NextFunction) {
  const configrepo = AppDataSource.getRepository(Config);

  const date = await configrepo.createQueryBuilder('c').orderBy('c.createdAt', 'DESC').getOne();

  if (!date) {
    return response.status(500).json({message: 'Penginputan suara belum bisa dilakukan'});
  }

  if (Dayjs().isBefore(date.date)) {
    return response.status(500).json({
      message: `Penginputan suara belum bisa dilakukan, penginputan dimulai pada ${Dayjs(date.date).format(
        'DD-MM-YYYY',
      )}`,
    });
  } else {
    next();
  }
}
