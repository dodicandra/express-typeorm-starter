import {UserVoteMasterDataController} from '../controller/UserVoteMasterDataController';
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
    method: 'post',
    route: '/user-vote-master',
    action: 'bulksave',
  },
]);
