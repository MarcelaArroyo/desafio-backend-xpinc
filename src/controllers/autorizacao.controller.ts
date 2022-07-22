import { Request, Response } from 'express';
import { autorizarLogin } from '../services/autorizacao.service';

export const controllerAutorizarLogin = async (req: Request, res: Response): 
Promise<Response> => {
  try{
    const { email, password } = req.body;
    const result = await autorizarLogin(email, password);
    if (!result) return res.status(404).json({ message: 'Email e/ou senha inválido' });
    return res.status(200).json(result);
  } catch (error: unknown | any) {
    return res.status(500).json({ message: error.message });
  }
};