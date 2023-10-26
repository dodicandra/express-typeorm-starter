import {PhotoController} from '../controller/PhotoController';
import {createRoutes} from '../utils/createRoute';

export const PhotoRoute = createRoutes([
  {
    controller: PhotoController,
    method: 'get',
    route: '/photo',
    action: 'all',
  },
  {
    controller: PhotoController,
    method: 'get',
    route: '/photo/test',
    action: 'test',
  },
  {
    controller: PhotoController,
    method: 'get',
    route: '/photo/:id',
    action: 'one',
  },
  {
    controller: PhotoController,
    method: 'post',
    route: '/photo',
    action: 'save',
  },
  {
    controller: PhotoController,
    method: 'delete',
    route: '/photo/:id',
    action: 'remove',
  },
]);
