import { buscarClientePorEmailSenha } from '../models/clientes.model';
import { gerarToken } from '../utils/JWToken';
import ICliente from '../interfaces/ICliente.interface';

export const autorizarLogin = async (email: string, password: string):
Promise<{token: string} | undefined> => {
  const cliente = await buscarClientePorEmailSenha(email, password);
  if (cliente.length !== 1) return undefined
  const payload: ICliente = {
    codCliente: cliente[0].codCliente,
    nome: cliente[0].nome,
    email: cliente[0].email
  }

  const token = gerarToken(payload);
  return { token }
}