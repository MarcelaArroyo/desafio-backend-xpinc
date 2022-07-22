import { NextFunction, Request, Response } from 'express';
import Mensagem from '../utils/mensagemValidacao';

const validacao = (codCliente: number, valor: number): [boolean | string, number] => {
  if (codCliente <= 0) return [`codCliente ${Mensagem.MIN_NUMERO}`, 422];
  if (valor <= 0) return [`Valor ${Mensagem.MIN_NUMERO}`, 422];
  if (!codCliente) return [`codCliente ${Mensagem.REQUERIDA}`, 400];
  if (!valor) return [`Valor ${Mensagem.REQUERIDA}`, 400];
  if (typeof codCliente !== 'number') return [`codCliente ${Mensagem.NUMERO}`, 422];
  if (typeof valor !== 'number') return [`Valor ${Mensagem.NUMERO}`, 422];

  return [true, 201];
};


export const contaValidacao = (req: Request, res: Response, next: NextFunction) => {
  const { codCliente, valor } = req.body;

  const [mensagem, status] = validacao(codCliente, valor);

  if (mensagem !== true) return res.status(status).json({ message: mensagem });

  next();
};