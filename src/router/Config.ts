import {ConfigController} from '../controller/Config';
import {createRoutes} from '../utils/createRoute';

export const configRoute = createRoutes([
  {controller: ConfigController, method: 'get', route: '/config', action: 'getDate'},
  {controller: ConfigController, method: 'post', route: '/config', action: 'setDate'},
]);
