import {VoterSupervisorController} from '../controller/VoterSupervisorController';
import {authMiddlewareSupervisor, authMiddlewareSupervisorBlock, authMiddlewareUserAdmin} from '../middleware/auth';
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
  {
    controller: VoterSupervisorController,
    method: 'get',
    route: '/supervisor/count',
    action: 'getCandidateCount',
    middleWare: [authMiddlewareSupervisor],
  },
  {
    controller: VoterSupervisorController,
    method: 'get',
    route: '/supervisor/my',
    action: 'getCandidateMy',
    middleWare: [authMiddlewareSupervisor, authMiddlewareSupervisorBlock],
  },
  {
    controller: VoterSupervisorController,
    method: 'get',
    route: '/supervisor/candidate',
    action: 'getCandidate',
    middleWare: [authMiddlewareUserAdmin],
  },
  {
    controller: VoterSupervisorController,
    method: 'delete',
    route: '/supervisor',
    action: 'delete',
    middleWare: [authMiddlewareUserAdmin],
  },
  {
    controller: VoterSupervisorController,
    method: 'put',
    route: '/supervisor',
    action: 'edit',
    middleWare: [authMiddlewareUserAdmin],
  },
  {
    controller: VoterSupervisorController,
    method: 'delete',
    route: '/supervisor/voter',
    action: 'deleteVoter',
    middleWare: [authMiddlewareUserAdmin],
  },
]);
