import { Router } from 'express';
import { controllerContaDeposito, controllerContaSaque, controllerContaCliente } from '../src/controllers/conta.controller';
import { validacaoToken } from '../src/middlewares/token.middleware';

const routes = Router();

routes.post('/conta/deposito', validacaoToken, controllerContaDeposito);
routes.post('/conta/saque', validacaoToken, controllerContaSaque);
routes.get('/conta/:codCliente', validacaoToken, controllerContaCliente);

export default routes;