import { Router } from 'express';
import { controllerContaDeposito } from '../src/controllers/conta.controller';

const routes = Router();

routes.post('/conta/deposito', controllerContaDeposito);


export default routes;