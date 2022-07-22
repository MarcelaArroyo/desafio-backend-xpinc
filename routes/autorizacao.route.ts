import { Router } from 'express';
import { controllerAutorizarLogin } from '../src/controllers/autorizacao.controller';

const routes = Router();

routes.post('/login', controllerAutorizarLogin);

export default routes;