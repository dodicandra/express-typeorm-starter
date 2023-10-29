import {UserController} from '../controller/UserController';
import {authMiddlewareUserAdmin} from '../middleware/auth';
import {createRoutes} from '../utils/createRoute';

export const userRoute = createRoutes([
  {
    controller: UserController,
    method: 'get',
    route: '/users',
    action: 'all',
  },
  {
    controller: UserController,
    method: 'get',
    route: '/users/:id',
    action: 'one',
  },
  {
    controller: UserController,
    method: 'post',
    route: '/users',
    action: 'save',
  },
  {
    controller: UserController,
    method: 'post',
    route: '/user/login',
    action: 'login',
  },
  {
    controller: UserController,
    method: 'delete',
    route: '/users/:id',
    action: 'remove',
    middleWare: [authMiddlewareUserAdmin],
  },
]);
