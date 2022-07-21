import IPedido from '../interfaces/IPedidoCompra.interface';
import IMessage from '../interfaces/IMessage.interface';
import { buscaSaldoConta, subtrairSaldoConta, adicionarSaldoConta } from '../models/conta.model';
import { qtdeAtivoDisponivelCorretora, 
  calculaValorTotal,
  atualizaCarteira,
  adicionaCompraHistorico,
  buscarCarteiraPorClienteEAtivo,
  subtrairQtdeAtivoCarteira,
  adicionaVendaHistorico,
} from '../models/investimentos.model';
import ICarteira from '../interfaces/ICarteira.interface';

export const comprarAtivo = async (pedidoCompra: IPedido):
Promise<IMessage> => {
  const { codCliente, codAtivo, qtdeAtivo } = pedidoCompra;
  const qtdeAtivoDisponivel = await qtdeAtivoDisponivelCorretora(codAtivo);

  if (qtdeAtivoDisponivel < qtdeAtivo) return { status: 406, message: 'Quantidade indisponível pela corretora'}

  const valorTotal = await calculaValorTotal(codAtivo, qtdeAtivo);
  const saldo = await buscaSaldoConta(codCliente);

  if (valorTotal > saldo) return { status: 406, message: 'Saldo insuficiente'}

  const carteiraAtualizada = await atualizaCarteira(codCliente, codAtivo, qtdeAtivo);
  
  if (carteiraAtualizada) {
    await subtrairSaldoConta(codCliente, valorTotal);
    await adicionaCompraHistorico(codCliente, codAtivo, qtdeAtivo, valorTotal);
    return { status: 200, message: 'Compra efetuada com sucesso'}
  } else {
    return { status: 406, message: 'Não foi possível realizar a compra do ativo' }
  }
};

export const venderAtivo = async (pedidoVenda: IPedido):
Promise<IMessage> => {
  const { codCliente, codAtivo, qtdeAtivo } = pedidoVenda;
  const carteira: ICarteira[] = await buscarCarteiraPorClienteEAtivo(codCliente, codAtivo);

  if (carteira.length === 0) return { status: 406, message: 'Carteira não encontrada' };

  if (carteira[0].qtdeAtivo < qtdeAtivo) return { status: 406, message: 'Quantidade de ativo insuficiente para vender' };

  const carteiraAtualizada = await subtrairQtdeAtivoCarteira(codCliente, codAtivo, qtdeAtivo);
  const valorTotal = await calculaValorTotal(codAtivo, qtdeAtivo);

  if (carteiraAtualizada) {
    await adicionarSaldoConta(codCliente, valorTotal);
    await adicionaVendaHistorico(codCliente, codAtivo, qtdeAtivo, valorTotal);
    return { status: 200, message: 'Venda efetuada com sucesso'}
  } else {
    return { status: 406, message: 'Não foi possível realizar a venda do ativo' }
  }
}