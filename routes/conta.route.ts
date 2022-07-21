import { Router } from 'express';
import { controllerContaDeposito, controllerContaSaque, controllerContaCliente } from '../src/controllers/conta.controller';

const routes = Router();

routes.post('/conta/deposito', controllerContaDeposito);
routes.post('/conta/saque', controllerContaSaque);
routes.get('/conta/:codCliente', controllerContaCliente)

export default routes;