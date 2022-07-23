import { Request, Response } from 'express';
import IMessage from '../interfaces/IMessage.interface';
import contaService from '../services/conta.service';

const contaDeposito = async (req: Request, res: Response): 
Promise<Response> => {
  try {
    const { codCliente, valor } = req.body;
    const deposito = await contaService.contaDeposito(+codCliente, +valor);
    return res.status(deposito.status).json({ message: deposito.message});
  } catch (error: unknown | any) {
    return res.status(500).json({ message: error.message });
  };
};

const contaSaque = async (req: Request, res: Response): 
Promise<Response> => {
  try {
    const { codCliente, valor } = req.body;
    const saque = await contaService.contaSaque(+codCliente, +valor);
    return res.status(saque.status).json({ message: saque.message});
  } catch (error: unknown | any) {
    return res.status(500).json({ message: error.message });
  };
};

const contaCliente = async (req: Request, res: Response): 
Promise<Response> => {
  try {
    const { codCliente } = req.params;
    const conta = await contaService.contaCliente(+codCliente);
    if (!conta) return res.status(404).json({ message: 'Conta não encontrada' });
    return res.status(200).json(conta);
  } catch (error: unknown | any) {
    return res.status(500).json({ message: error.message });
  };
};

export default {
  contaDeposito,
  contaSaque,
  contaCliente
}