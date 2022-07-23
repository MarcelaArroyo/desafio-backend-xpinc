import { Request, Response } from 'express';
import investimentosService from "../services/investimentos.service";


const comprarAtivos = async (req: Request, res: Response): 
Promise<Response> => {
  try {
    const compra = await investimentosService.comprarAtivos(req.body);
    return res.status(compra.status).json({ message: compra.message });
  } catch (error: unknown | any) {
    return res.status(500).json({ message: error.message });
  };
};

const venderAtivos = async (req: Request, res: Response): 
Promise<Response> => {
  try {
    const venda = await investimentosService.venderAtivos(req.body);
    return res.status(venda.status).json({ message: venda.message });
  } catch (error: unknown | any) {
    return res.status(500).json({ message: error.message });
  };
};

export default {
  comprarAtivos,
  venderAtivos
}

