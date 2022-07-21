import { Request, Response } from 'express';
import { ativoPeloCodAtivo } from '../services/ativos.service';

export const controllerAtivo = async (req: Request, res: Response): 
Promise<Response> => {
  try {
    const { codAtivo } = req.params;
    const result = await ativoPeloCodAtivo(+codAtivo)

    if (!result) return res.status(404).json({ message: 'Ativo não encontrado' });

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};