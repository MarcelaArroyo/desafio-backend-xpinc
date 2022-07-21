import { Router } from 'express';
import { controllerAtivo } from '../src/controllers/ativos.controller';

const routes = Router();

routes.get('/ativos/:codAtivo', controllerAtivo);

export default routes;