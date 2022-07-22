import e, { NextFunction, Request, Response } from 'express';
import Mensagem from '../utils/mensagemValidacao';

const validacao = (email: string, password: string): [boolean | string, number] => {
  const regexEmail = /\S+@\S+\.\S+/;

  if (!email) return [`email ${Mensagem.REQUERIDA}`, 400];
  if (typeof email !== 'string') return [`Email ${Mensagem.TEXTO}`, 400];
  if (!regexEmail.test(email)) return [`${Mensagem.EMAIL}`, 422];
  if (!password) return [`Senha ${Mensagem.REQUERIDA}`, 400];
  if (typeof password !== 'string') return [`Senha ${Mensagem.TEXTO}`, 422];
  if (password.length < 6) return [`Senha ${Mensagem.MIN_PASSWORD}`, 422];

  return [true, 201];
};


export const authValidacao = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const [mensagem, status] = validacao(email, password);

  if (mensagem !== true) return res.status(status).json({ message: mensagem });

  next();
};