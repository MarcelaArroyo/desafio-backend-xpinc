import { Router } from 'express';
import { controllerComprar, controllerVender } from '../src/controllers/investimentos.controller';
import { validacaoToken } from '../src/middlewares/token.middleware';
import { investimentosValidacao } from '../src/middlewares/investimentos.middleware';

const routes = Router();

routes.post('/investimentos/comprar', validacaoToken, investimentosValidacao, controllerComprar);
routes.post('/investimentos/vender', validacaoToken, investimentosValidacao, controllerVender);

export default routes;