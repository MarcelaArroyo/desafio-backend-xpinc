import { Router } from 'express';
import authController from '../src/controllers/autorizacao.controller';
import { authValidacao } from '../src/middlewares/autorizacao.middleware';

const routes = Router();

routes.post('/auth', authValidacao, authController.autorizarCliente);

export default routes;