import {UserVoteController} from '../controller/UserVoteController';
import {authMiddlewareUserAdmin} from '../middleware/auth';
import {createRoutes} from '../utils/createRoute';

export const UserVoteRoute = createRoutes([
  {
    controller: UserVoteController,
    method: 'get',
    route: '/user-vote',
    action: 'all',
  },
  {
    controller: UserVoteController,
    method: 'get',
    route: '/user-vote/:id',
    action: 'one',
  },
  {
    controller: UserVoteController,
    method: 'post',
    route: '/user-vote',
    action: 'save',
    middleWare: [authMiddlewareUserAdmin],
  },
  {
    controller: UserVoteController,
    method: 'delete',
    route: '/user-vote/:id',
    action: 'remove',
    middleWare: [authMiddlewareUserAdmin],
  },
]);
