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
  if (!userCookie.user_witness_email || !userCookie.user_witness_id) {
    return res.status(401).json({message: 'Unauthorize'});
  }

  const userWitnessRepo = AppDataSource.getRepository(UserWitness);

  const user = await userWitnessRepo.findOne({where: {email: Equal(userCookie.user_witness_email)}});

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
  console.log({supervisor: userCookie});
  const user = await userAdmin.findOne({where: {email: Equal(email), password: Equal(password)}});

  if (user) {
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
