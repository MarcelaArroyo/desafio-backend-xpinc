import IPedido from '../interfaces/IPedido.interface';
import IMessage from '../interfaces/IMessage.interface';
import contaModel from '../models/conta.model';
import investimentosModel from '../models/investimentos.model';
import ICarteira from '../interfaces/ICarteira.interface';

const comprarAtivos = async (pedidoCompra: IPedido):
Promise<IMessage> => {
  const { codCliente, codAtivo, qtdeAtivo } = pedidoCompra;
  const qtdeAtivoDisponivel = await investimentosModel.qtdeAtivoDisponivelCorretora(codAtivo);

  if (qtdeAtivoDisponivel < qtdeAtivo) return { status: 404, message: 'Quantidade indisponível pela corretora'}

  const valorTotal = await investimentosModel.calculaValorTotal(codAtivo, qtdeAtivo);
  const saldo = await contaModel.buscaSaldoConta(codCliente);

  if (valorTotal > saldo) return { status: 404, message: 'Saldo insuficiente'}

  const carteiraAtualizada = await investimentosModel.atualizaCarteira(codCliente, codAtivo, qtdeAtivo);
  
  if (carteiraAtualizada) {
    await contaModel.subtrairSaldoConta(codCliente, valorTotal);
    await investimentosModel.adicionaCompraHistorico(codCliente, codAtivo, qtdeAtivo, valorTotal);
    return { status: 201, message: 'Compra efetuada com sucesso'}
  } else {
    return { status: 404, message: 'Não foi possível realizar a compra do ativo' }
  };
};

const venderAtivos = async (pedidoVenda: IPedido):
Promise<IMessage> => {
  const { codCliente, codAtivo, qtdeAtivo } = pedidoVenda;
  const carteira: ICarteira[] = await investimentosModel.buscarCarteiraPorClienteEAtivo(codCliente, codAtivo);

  if (carteira.length === 0) return { status: 404, message: 'Carteira não encontrada' };

  if (carteira[0].qtdeAtivo < qtdeAtivo) return { status: 404, message: 'Quantidade de ativo insuficiente para vender' };

  const carteiraAtualizada = await investimentosModel.subtrairQtdeAtivoCarteira(codCliente, codAtivo, qtdeAtivo);
  const valorTotal = await investimentosModel.calculaValorTotal(codAtivo, qtdeAtivo);

  if (carteiraAtualizada) {
    await contaModel.adicionarSaldoConta(codCliente, valorTotal);
    await investimentosModel.adicionaVendaHistorico(codCliente, codAtivo, qtdeAtivo, valorTotal);
    return { status: 201, message: 'Venda efetuada com sucesso'}
  } else {
    return { status: 404, message: 'Não foi possível realizar a venda do ativo' }
  };
};

export default {
  comprarAtivos,
  venderAtivos
}