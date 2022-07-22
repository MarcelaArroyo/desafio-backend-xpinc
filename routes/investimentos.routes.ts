import { Router } from 'express';
import { controllerComprar, controllerVender } from '../src/controllers/investimentos.controller';
import { validacaoToken } from '../src/middlewares/token.middleware';

const routes = Router();

routes.post('/investimentos/comprar', validacaoToken, controllerComprar);
routes.post('/investimentos/vender', validacaoToken, controllerVender);

export default routes;