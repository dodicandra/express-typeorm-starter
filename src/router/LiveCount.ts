import {LiveCountController} from '../controller/LiveCountController';
import {authMiddlewareUserWitness} from '../middleware/auth';
import {createRoutes} from '../utils/createRoute';

export const LiveCountRoute = createRoutes([
  {
    controller: LiveCountController,
    method: 'get',
    route: '/live',
    action: 'all',
  },
  {
    controller: LiveCountController,
    method: 'get',
    route: '/live/:name',
    action: 'getCalegCount',
  },
  {
    controller: LiveCountController,
    method: 'post',
    route: '/live',
    action: 'save',
    middleWare: [authMiddlewareUserWitness],
  },
  {
    controller: LiveCountController,
    method: 'delete',
    route: '/live',
    action: 'remove',
  },
]);
