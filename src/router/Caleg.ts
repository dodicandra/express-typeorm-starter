import {CalegController} from '../controller/CalegController';
import {authMiddlewareUserAdmin} from '../middleware/auth';
import {createRoutes} from '../utils/createRoute';

export const calegRoute = createRoutes([
  {
    controller: CalegController,
    action: 'save',
    method: 'post',
    route: '/caleg',
    middleWare: [authMiddlewareUserAdmin],
  },
  {
    controller: CalegController,
    action: 'all',
    method: 'get',
    route: '/caleg',
    middleWare: [authMiddlewareUserAdmin],
  },
  {
    controller: CalegController,
    action: 'update',
    method: 'put',
    route: '/caleg/:id',
    middleWare: [authMiddlewareUserAdmin],
  },
]);
