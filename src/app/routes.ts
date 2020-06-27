import { Router } from 'express';
import * as middleware from './middleware';
import * as controllers from './controllers';

const routes = Router();

// Places
routes.get('/places', controllers.Place.index);
routes.get('/places/:id', middleware.hasValidId, controllers.Place.show);

// Extractions
routes.get('/extractions/today', controllers.Extraction.today);

export default routes;