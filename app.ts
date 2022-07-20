import express from 'express';
import investimentosRoutes from './routes/investimentos.routes';

const app = express();

app.use(express.json());
app.use(investimentosRoutes);

export default app;