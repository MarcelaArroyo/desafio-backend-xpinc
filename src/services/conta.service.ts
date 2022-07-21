import IMessage from '../interfaces/IMessage.interface';
import { adicionarSaldoConta, buscaSaldoConta } from '../models/conta.model';

export const contaDeposito = async (codCliente: number, valor: number):
Promise<IMessage> => {
  const deposito: boolean = await adicionarSaldoConta(codCliente, valor);
  const saldo: number = await buscaSaldoConta(codCliente);

  if (deposito) {
    return { status: 201, message: `Depósito no valor de ${valor} reais feito com sucesso. Novo saldo de ${saldo}`}
  } else {
    return { status: 404, message: 'Erro ao tentar fazer o depósito. Tente novamente'};
  };
}