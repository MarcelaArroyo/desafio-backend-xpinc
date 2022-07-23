import { Router } from 'express';
import contaController from '../src/controllers/conta.controller';
import { validacaoToken } from '../src/middlewares/token.middleware';
import { contaValidacao } from '../src/middlewares/conta.middleware';

const routes = Router();

routes.post('/conta/deposito', validacaoToken, contaValidacao, contaController.contaDeposito);
routes.post('/conta/saque', validacaoToken, contaValidacao, contaController.contaSaque);
routes.get('/conta/:codCliente', validacaoToken, contaController.contaCliente);

export default routes;