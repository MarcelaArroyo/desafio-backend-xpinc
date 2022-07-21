import { Request, Response } from 'express';
import { contaDeposito, contaSaque } from '../services/conta.service';

export const controllerContaDeposito = async (req: Request, res: Response): 
Promise<Response> => {
  try {
    const { codCliente, valor } = req.body;
    const result = await contaDeposito(codCliente, valor);
    return res.status(result.status).json({ message: result.message});
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const controllerContaSaque = async (req: Request, res: Response): 
Promise<Response> => {
  try {
    const { codCliente, valor } = req.body;
    const result = await contaSaque(codCliente, valor);
    return res.status(result.status).json({ message: result.message});
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};