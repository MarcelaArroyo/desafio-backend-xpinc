import { Router } from 'express';
import { controllerComprar } from '../src/controllers/investimentos.controller';

const routes = Router();

routes.post('/investimentos/comprar', controllerComprar);

export default routes;