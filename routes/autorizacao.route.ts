import { Router } from 'express';
import { controllerAutorizarLogin } from '../src/controllers/autorizacao.controller';
import { authValidacao } from '../src/middlewares/autorizacao.middleware';

const routes = Router();

routes.post('/auth', authValidacao, controllerAutorizarLogin);

export default routes;