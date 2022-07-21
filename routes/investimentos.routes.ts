import { Router } from 'express';
import { controllerComprar, controllerVender } from '../src/controllers/investimentos.controller';

const routes = Router();

routes.post('/investimentos/comprar', controllerComprar);
routes.post('/investimentos/vender', controllerVender);

export default routes;