import { Router } from 'express';
import investimentosController from '../src/controllers/investimentos.controller';
import { validacaoToken } from '../src/middlewares/token.middleware';
import { investimentosValidacao } from '../src/middlewares/investimentos.middleware';

const routes = Router();

routes.post('/investimentos/comprar', validacaoToken, investimentosValidacao, investimentosController.comprarAtivos);
routes.post('/investimentos/vender', validacaoToken, investimentosValidacao, investimentosController.venderAtivos);

export default routes;