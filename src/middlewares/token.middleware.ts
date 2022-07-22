import { verificarToken } from '../utils/JWToken';
import { Request, Response, NextFunction } from 'express';

export const validacaoToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  const payload = await verificarToken(token);

  if (!payload) return res.status(401).json({ message: 'Token mal formado' })

  res.locals.payload;

  next();
}