import {BlockController} from '../controller/BlockController';
import {authMiddlewareUserAdmin} from '../middleware/auth';
import {createRoutes} from '../utils/createRoute';

export const BlockRoute = createRoutes([
  {
    controller: BlockController,
    action: 'save',
    method: 'post',
    route: '/block/user',
    middleWare: [authMiddlewareUserAdmin],
  },
  {
    controller: BlockController,
    action: 'get',
    method: 'get',
    route: '/block/user/:email',
  },
  {
    controller: BlockController,
    action: 'update',
    method: 'put',
    route: '/block/user/:email',
    middleWare: [authMiddlewareUserAdmin],
  },
]);
