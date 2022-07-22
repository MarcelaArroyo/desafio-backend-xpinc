import { JwtPayload, sign, SignOptions, verify } from 'jsonwebtoken';
import ICliente from '../interfaces/ICliente.interface';

const SECRET: string = process.env.SECRET || 'fgiAS$*&@4DFad89367fgu%$$i6';

const jwtConfig: SignOptions = {
  expiresIn: '30min',
  algorithm: 'HS256',
};

export const gerarToken = (payload: ICliente) => sign(payload, SECRET, jwtConfig);

export const verificarToken = async (token: string | undefined):
Promise<string | JwtPayload | undefined> => {
  if (!token) {
    return undefined
  }

  try{
    const validar = verify(token, SECRET);
    return validar;
  } catch {
    return undefined
  }
};
