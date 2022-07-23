import { Request, Response } from 'express';
import ativosService from '../services/ativos.service';

const ativoPeloCodAtivo = async (req: Request, res: Response): 
Promise<Response> => {
  try {
    const { codAtivo } = req.params;
    const ativo = await ativosService.ativoPeloCodAtivo(+codAtivo)

    if (!ativo) return res.status(404).json({ message: 'Ativo não encontrado' });

    return res.status(200).json(ativo);
  } catch (error: unknown | any) {
    return res.status(500).json({ message: error.message });
  };
};

const ativosPeloCodCliente = async (req: Request, res: Response): 
Promise<Response> => {
  try {
    const { codCliente } = req.params;
    const ativos = await ativosService.ativosPeloCodCliente(+codCliente)

    if (!ativos) return res.status(404).json({ message: 'Cliente não encontrado' });

    return res.status(200).json(ativos);
  } catch (error: unknown | any) {
    return res.status(500).json({ message: error.message });
  };
};

export default {
  ativoPeloCodAtivo,
  ativosPeloCodCliente
}