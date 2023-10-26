import {NextFunction, Request, Response} from 'express';

import {AppDataSource} from '../data-source';
import {UserWitness} from '../entity';

export async function authMiddlewareUserWitness(req: Request, res: Response, next: NextFunction) {
  const {cookies} = req;
  const userCookie = cookies;

  const userWitnessRepo = AppDataSource.getRepository(UserWitness);

  const user = await userWitnessRepo.findOne({where: {name: userCookie.user_name, id: Number(userCookie.user_id)}});

  if (user) {
    next();
  } else {
    res.status(401).json({message: 'Unauthorize'});
  }
}
