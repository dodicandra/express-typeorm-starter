import {VoterSupervisorController} from '../controller/VoterSupervisor';
import {authMiddlewareUserAdmin} from '../middleware/auth';
import {createRoutes} from '../utils/createRoute';

export const voterSupervisorVoteRoute = createRoutes([
  {
    controller: VoterSupervisorController,
    method: 'get',
    route: '/supervisor',
    action: 'all',
  },
  {
    controller: VoterSupervisorController,
    method: 'post',
    route: '/supervisor',
    action: 'save',
    middleWare: [authMiddlewareUserAdmin],
  },
]);
