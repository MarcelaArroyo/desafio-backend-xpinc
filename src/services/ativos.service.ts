import IAtivo from '../interfaces/IAtivo.interface';
import IAtivos from '../interfaces/IAtivos.interface';
import ativosModel from '../models/ativos.model';

const ativoPeloCodAtivo = async (codAtivo: number):
Promise<IAtivo | undefined> => {
  const ativo = await ativosModel.buscarAtivoPeloCodAtivo(codAtivo);
  
  if (ativo.length === 0) return undefined
  
  return {
    codAtivo: ativo[0].codAtivo,
    qtdeAtivo: ativo[0].qtdeAtivo,
    valor: +ativo[0].valor
  }
};

const ativosPeloCodCliente = async (codCliente: number):
Promise<IAtivos[] | undefined> => {
  const ativos = await ativosModel.buscarCarteiraPeloCodCliente(codCliente);

  if (ativos.length === 0) return undefined
  
  const result = ativos.map((ativo) => {
    return {
      codCliente: ativo.codCliente,
      codAtivo: ativo.codAtivo,
      qtdeAtivo: ativo.qtdeAtivo,
      valor: +ativo.valor
    }
  })

  return result as IAtivos[];
};

export default {
  ativoPeloCodAtivo,
  ativosPeloCodCliente
}