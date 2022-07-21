import { Router } from 'express';
import { controllerAtivo, controllerAtivoCliente } from '../src/controllers/ativos.controller';

const routes = Router();

routes.get('/ativos/:codAtivo', controllerAtivo);
routes.get('/ativos/cliente/:codCliente', controllerAtivoCliente);

export default routes;