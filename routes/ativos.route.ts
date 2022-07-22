import { Router } from 'express';
import { controllerAtivo, controllerAtivoCliente } from '../src/controllers/ativos.controller';
import { validacaoToken } from '../src/middlewares/token.middleware';

const routes = Router();

routes.get('/ativos/:codAtivo', validacaoToken, controllerAtivo);
routes.get('/ativos/cliente/:codCliente', validacaoToken, controllerAtivoCliente);

export default routes;