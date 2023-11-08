import {UserVoteController} from '../controller/UserVoteController';
import {authMiddlewareSupervisor, authMiddlewareUserAdmin} from '../middleware/auth';
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
    middleWare: [authMiddlewareSupervisor],
  },
  {
    controller: UserVoteController,
    method: 'post',
    route: '/user-vote/bulk',
    action: 'bulksave',
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
