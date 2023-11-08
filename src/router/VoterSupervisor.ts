import {VoterSupervisorController} from '../controller/VoterSupervisor';
import {authMiddlewareUserAdmin} from '../middleware/auth';
import {createRoutes} from '../utils/createRoute';

export const voterSupervisorVoteRoute = createRoutes([
  {
    controller: VoterSupervisorController,
    method: 'get',
    route: '/supervisor',
    action: 'all',
    middleWare: [authMiddlewareUserAdmin],
  },
  {
    controller: VoterSupervisorController,
    method: 'post',
    route: '/supervisor',
    action: 'save',
    middleWare: [authMiddlewareUserAdmin],
  },
  {
    controller: VoterSupervisorController,
    method: 'post',
    route: '/supervisor/login',
    action: 'login',
  },
]);
