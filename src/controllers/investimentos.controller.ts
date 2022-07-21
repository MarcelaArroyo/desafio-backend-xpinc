import { Request, Response } from 'express';
import { comprarAtivo, venderAtivo } from "../services/investimentos.service";


export const controllerComprar = async (req: Request, res: Response): 
Promise<Response> => {
  try {
    const result = await comprarAtivo(req.body);
    return res.status(result.status).json({ message: result.message });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const controllerVender = async (req: Request, res: Response): 
Promise<Response> => {
  try {
    const result = await venderAtivo(req.body);
    return res.status(result.status).json({ message: result.message });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

