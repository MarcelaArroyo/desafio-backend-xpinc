import { Router } from 'express';
import { controllerContaDeposito, controllerContaSaque, controllerContaCliente } from '../src/controllers/conta.controller';
import { validacaoToken } from '../src/middlewares/token.middleware';
import { contaValidacao } from '../src/middlewares/conta.middleware';

const routes = Router();

routes.post('/conta/deposito', validacaoToken, contaValidacao, controllerContaDeposito);
routes.post('/conta/saque', validacaoToken, contaValidacao, controllerContaSaque);
routes.get('/conta/:codCliente', validacaoToken, controllerContaCliente);

export default routes;