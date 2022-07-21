import { Router } from 'express';
import { controllerContaDeposito, controllerContaSaque } from '../src/controllers/conta.controller';

const routes = Router();

routes.post('/conta/deposito', controllerContaDeposito);
routes.post('/conta/saque', controllerContaSaque);

export default routes;