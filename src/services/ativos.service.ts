import IAtivo from '../interfaces/IAtivo.interface';
import { buscarAtivoPeloCodAtivo } from '../models/ativos.model';

export const ativoPeloCodAtivo = async (codAtivo: number):
Promise<IAtivo | undefined> => {
  const ativo = await buscarAtivoPeloCodAtivo(codAtivo);

  if (ativo.length === 0) return undefined
  
  return {
    codAtivo: ativo[0].codAtivo,
    qtdeAtivo: ativo[0].qtdeAtivo,
    valor: +ativo[0].valor
  }
}