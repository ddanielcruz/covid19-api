import { Router } from 'express';
import { hasValidId, hasValidDate } from './middleware';
import * as controllers from './controllers';

const routes = Router();

// Places
routes.get('/places', controllers.Place.index);
routes.get('/places/:id', hasValidId, controllers.Place.show);
routes.get(
  '/places/:id/extractions',
  hasValidId,
  controllers.Extraction.findByPlace
);

// Cases
routes.get('/cases/today', controllers.Case.today);
routes.get('/cases/:date', hasValidDate, controllers.Case.findByDate);

export default routes;
