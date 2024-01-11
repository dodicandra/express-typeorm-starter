import {LiveCountController} from '../controller/LiveCountController';
import {allowCount} from '../middleware/allow-counting';
import {authMiddlewareUserAdmin, authMiddlewareUserWitness} from '../middleware/auth';
import {upload} from '../storage/multer';
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
    route: '/live/count',
    action: 'getTotalVotes',
    middleWare: [authMiddlewareUserAdmin],
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
    middleWare: [
      allowCount,
      authMiddlewareUserWitness,
      upload.fields([{name: 'caleg_teli'}, {name: 'total_caleg_teli'}, {name: 'total_teli'}, {name: 'ri_teli'}]),
    ],
  },
  {
    controller: LiveCountController,
    method: 'delete',
    route: '/live',
    action: 'remove',
    middleWare: [authMiddlewareUserWitness],
  },
  {
    controller: LiveCountController,
    method: 'put',
    route: '/live/:id',
    action: 'edit',
    middleWare: [allowCount, authMiddlewareUserWitness, upload.array('images', 3)],
  },
]);
