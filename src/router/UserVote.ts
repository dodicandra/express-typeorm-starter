import {UserVoteController} from '../controller/UserVoteController';
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
  },
  {
    controller: UserVoteController,
    method: 'delete',
    route: '/user-vote/:id',
    action: 'remove',
  },
]);
