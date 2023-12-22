import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {Equal} from 'typeorm';

import {AppDataSource} from '../data-source';
import {User, UserWitness, VoterSuperVisor} from '../entity';

export const jwtSecret = 'aksndfhasdbfaeyJBHASDBWYDFbAKJS88asd67wbh';

export async function authMiddlewareUserWitness(req: Request, res: Response, next: NextFunction) {
  const {cookies} = req;
  const userCookie = cookies;
  console.log({witness: userCookie});

  if (!userCookie.user_witness_token) {
    return res.status(401).json({message: 'Witness Unauthorize'});
  }
  const token = userCookie.user_witness_token.split(':');
  const email = token[0];
  const name = token[1];
  const id = Number(token[2]);
  const userWitnessRepo = AppDataSource.getRepository(UserWitness);

  const user = await userWitnessRepo.findOne({where: {email: Equal(email)}});

  if (user) {
    req.app.locals.user_witness_token = {
      email,
      id,
      name,
    };
    next();
  } else {
    res.status(401).json({message: 'Unauthorize'});
  }
}

export async function authMiddlewareUserAdmin(req: Request, res: Response, next: NextFunction) {
  const {cookies} = req;
  const userCookie = cookies;

  const userAdmin = AppDataSource.getRepository(User);
  const token = userCookie.user_admin_token?.split(':') ?? '';
  const name = token[0];
  const password = token[1];
  // const role = token[2] as UserInterface.Role;
  console.log({admin: userCookie});
  const user = await userAdmin.findOne({where: {name: Equal(name), password: Equal(password), role: 'super_admin'}});

  if (user) {
    next();
  } else {
    res.status(401).json({message: 'Unauthorize'});
  }
}

export async function authMiddlewareSupervisor(req: Request, res: Response, next: NextFunction) {
  const {cookies} = req;
  const userCookie = cookies;

  const userAdmin = AppDataSource.getRepository(VoterSuperVisor);
  const token = userCookie.supervisor_token?.split(':') ?? '';

  const email = token[0];
  const password = token[1];
  const name = token[2];
  console.log({supervisor: userCookie});
  const user = await userAdmin.findOne({where: {email: Equal(email), password: Equal(password)}});

  if (user) {
    req.app.locals.supervisor_token = {
      email,
      password,
      name,
    };
    next();
  } else {
    res.status(401).json({message: 'SuperVisor Unauthorize'});
  }
}

export function authJWT(req: Request, res: Response, next: Function) {
  if (!req.headers.authorization) return res.status(401).json({message: 'not authorization'});
  const authHeader = req.headers.authorization.split(' ')[1];
  try {
    const credentials = jwt.verify(authHeader, jwtSecret);
    if (typeof credentials !== 'string' && 'iss' in credentials) {
      next();
    }
  } catch (err) {
    return res.status(401).json({message: 'Kamu tidak punya akses'});
  }
}
