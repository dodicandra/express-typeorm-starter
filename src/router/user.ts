import {UserController} from '../controller/UserController';
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
    route: '/users/test',
    action: 'test',
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
    method: 'delete',
    route: '/users/:id',
    action: 'remove',
  },
]);
