import { Router } from 'express';
import ativosController from '../src/controllers/ativos.controller';

const routes = Router();

routes.get('/ativos/:codAtivo', ativosController.ativoPeloCodAtivo);
routes.get('/ativos/cliente/:codCliente', ativosController.ativosPeloCodCliente);

export default routes;