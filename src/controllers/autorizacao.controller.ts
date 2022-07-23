import { Request, Response } from 'express';
import authService from '../services/autorizacao.service';

const autorizarCliente = async (req: Request, res: Response): 
Promise<Response> => {
  try{
    const { email, password } = req.body;
    const result = await authService.autorizarCliente(email, password);
    if (!result) return res.status(404).json({ message: 'Email e/ou senha inválido' });
    return res.status(200).json(result);
  } catch (error: unknown | any) {
    return res.status(500).json({ message: error.message });
  };
};

export default {
  autorizarCliente,
}