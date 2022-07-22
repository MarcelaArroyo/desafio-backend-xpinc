import { NextFunction, Request, Response } from 'express';
import Mensagem from '../utils/mensagemValidacao';

const validacao = (codCliente: number, codAtivo: number, qtdeAtivo: number): [boolean | string, number] => {
  if (codCliente <= 0) return [`codCliente ${Mensagem.MIN_NUMERO}`, 422];
  if (!codCliente) return [`codCliente ${Mensagem.REQUERIDA}`, 400];
  if (typeof codCliente !== 'number') return [`codCliente ${Mensagem.NUMERO}`, 422];
  if (codAtivo <= 0) return [`codAtivo ${Mensagem.MIN_NUMERO}`, 422];
  if (!codAtivo) return [`codAtivo ${Mensagem.REQUERIDA}`, 400];
  if (typeof codAtivo !== 'number') return [`codAtivo ${Mensagem.NUMERO}`, 422];
  if (qtdeAtivo <= 0) return [`qtdeAtivo ${Mensagem.MIN_NUMERO}`, 422];
  if (!qtdeAtivo) return [`qtdeAtivo ${Mensagem.REQUERIDA}`, 400];
  if (typeof qtdeAtivo !== 'number') return [`qtdeAtivo ${Mensagem.NUMERO}`, 422];

  return [true, 201];
};


export const investimentosValidacao = (req: Request, res: Response, next: NextFunction) => {
  const { codCliente, codAtivo, qtdeAtivo } = req.body;

  const [mensagem, status] = validacao(codCliente, codAtivo, qtdeAtivo);

  if (mensagem !== true) return res.status(status).json({ message: mensagem });

  next();
};