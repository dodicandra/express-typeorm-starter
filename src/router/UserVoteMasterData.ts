import {UserVoteMasterDataController} from '../controller/UserVoteMasterDataController';
import {authMiddlewareUserAdmin} from '../middleware/auth';
import {createRoutes} from '../utils/createRoute';

export const UserVoteMasterRoute = createRoutes([
  {
    controller: UserVoteMasterDataController,
    method: 'get',
    route: '/user-vote-master',
    action: 'all',
  },
  {
    controller: UserVoteMasterDataController,
    method: 'get',
    route: '/user-vote-masters',
    action: 'allAsAdmin',
    middleWare: [authMiddlewareUserAdmin],
  },
  {
    controller: UserVoteMasterDataController,
    method: 'post',
    route: '/user-vote-master',
    action: 'bulksave',
  },
]);
