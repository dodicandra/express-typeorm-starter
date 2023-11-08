import {AreaController} from '../controller/AraController';
import {createRoutes} from '../utils/createRoute';

export const areaRoute = createRoutes([
  {
    controller: AreaController,
    action: 'saveKecamatan',
    method: 'post',
    route: '/kecamatan',
  },
  {
    controller: AreaController,
    action: 'bulksaveKecamatan',
    method: 'post',
    route: '/kecamatan/bulk',
  },
  {
    controller: AreaController,
    action: 'allKecamatan',
    method: 'get',
    route: '/kecamatan',
  },
  {
    controller: AreaController,
    action: 'saveKelurahan',
    method: 'post',
    route: '/kelurahan',
  },
  {
    controller: AreaController,
    action: 'bulksaveKelurahan',
    method: 'post',
    route: '/kelurahan/bulk',
  },
  {
    controller: AreaController,
    action: 'allKelurahan',
    method: 'get',
    route: '/kelurahan',
  },
  {
    controller: AreaController,
    action: 'saveTps',
    method: 'post',
    route: '/tps',
  },
  {
    controller: AreaController,
    action: 'bulksaveTps',
    method: 'post',
    route: '/tps/bulk',
  },
  {
    controller: AreaController,
    action: 'allTps',
    method: 'get',
    route: '/tps',
  },
]);
