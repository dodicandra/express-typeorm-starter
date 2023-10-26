import {CalegController} from '../controller/CalegController';
import {createRoutes} from '../utils/createRoute';

export const calegRoute = createRoutes([
  {
    controller: CalegController,
    action: 'save',
    method: 'post',
    route: '/caleg',
  },
]);
