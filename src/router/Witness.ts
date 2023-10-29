import {UserWitnessController} from '../controller/WitnessController';
import {authMiddlewareUserAdmin, authMiddlewareUserWitness} from '../middleware/auth';
import {createRoutes} from '../utils/createRoute';

export const UserWitnessRoute = createRoutes([
  {
    controller: UserWitnessController,
    method: 'get',
    route: '/users-witness',
    middleWare: [authMiddlewareUserWitness],
    action: 'all',
  },
  {
    controller: UserWitnessController,
    method: 'get',
    route: '/users-witness/:id',
    action: 'one',
  },
  {
    controller: UserWitnessController,
    method: 'post',
    route: '/users-witness',
    action: 'save',
    middleWare: [authMiddlewareUserAdmin],
  },
  {
    controller: UserWitnessController,
    method: 'post',
    route: '/users-witness/login',
    action: 'login',
  },
  {
    controller: UserWitnessController,
    method: 'delete',
    route: '/users-witness/:id',
    action: 'remove',
    middleWare: [authMiddlewareUserAdmin],
  },
]);
