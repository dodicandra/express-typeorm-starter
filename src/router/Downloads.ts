import {DownloadController} from '../controller/DownloadController';
import {authMiddlewareSupervisor} from '../middleware/auth';
import {createRoutes} from '../utils/createRoute';

export const downlaodRoute = createRoutes([
  {
    controller: DownloadController,
    method: 'get',
    route: '/download/calon',
    action: 'pdfCalonBySuperVisor',
    middleWare: [authMiddlewareSupervisor],
  },
]);
