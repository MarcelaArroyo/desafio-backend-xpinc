import express from 'express';
import investimentosRoutes from './routes/investimentos.routes';
import ativosRoutes from './routes/ativos.route';
import contaRoutes from './routes/conta.route';
import autorizacaoRoutes from './routes/autorizacao.route';
import httpErroMiddleware from './src/middlewares/http.erro.middleware';

const app = express();

app.use(express.json());
app.use(investimentosRoutes);
app.use(ativosRoutes);
app.use(contaRoutes);
app.use(autorizacaoRoutes);
app.use(httpErroMiddleware);

export default app;