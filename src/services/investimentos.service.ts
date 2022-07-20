import IPedidoCompra from '../interfaces/IPedidoCompra.interface';
import IMessage from '../interfaces/IMessage.interface';
import { buscaSaldoConta, atualizaSaldoConta } from '../models/conta.model';
import { qtdeAtivoDisponivelCorretora, 
  calculaValorTotal,
  atualizaCarteira,
  adicionaCompraHistorico,
} from '../models/investimentos.model';

export const comprarAtivo = async (pedidoCompra: IPedidoCompra):
Promise<IMessage> => {
  const { codCliente, codAtivo, qtdeAtivo } = pedidoCompra;
  const qtdeAtivoDisponivel = await qtdeAtivoDisponivelCorretora(codAtivo);

  if (qtdeAtivoDisponivel < qtdeAtivo) return { status: 406, message: 'Quantidade indisponível pela corretora'}

  const valorTotal = await calculaValorTotal(codAtivo, qtdeAtivo);
  const saldo = await buscaSaldoConta(codCliente);

  if (valorTotal > saldo) return { status: 406, message: 'Saldo insuficiente'}

  const carteiraAtualizada = await atualizaCarteira(codCliente, codAtivo, qtdeAtivo);
  
  if (carteiraAtualizada) {
    await atualizaSaldoConta(codCliente, valorTotal);
    await adicionaCompraHistorico(codCliente, codAtivo, qtdeAtivo, valorTotal);
    return { status: 200, message: 'Compra efetuada com sucesso'}
  } else {
    return { status: 406, message: 'Não foi possível realizar a compra do ativo' }
  }
  
};