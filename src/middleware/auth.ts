import {NextFunction, Request, Response} from 'express';
import {Equal} from 'typeorm';

import {AppDataSource} from '../data-source';
import {User, UserWitness} from '../entity';

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

export async function authMiddlewareUserAdmin(req: Request, res: Response, next: NextFunction) {
  const {cookies} = req;
  const userCookie = cookies;

  const userAdmin = AppDataSource.getRepository(User);
  const token = userCookie.user_admin_token.split(':');
  const name = token[0];
  const password = token[1];
  // const role = token[2] as UserInterface.Role;

  const user = await userAdmin.findOne({where: {name: Equal(name), password: Equal(password), role: 'super_admin'}});

  if (user) {
    next();
  } else {
    res.status(401).json({message: 'Unauthorize'});
  }
}
