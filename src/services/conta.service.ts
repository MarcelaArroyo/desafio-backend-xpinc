import IMessage from '../interfaces/IMessage.interface';
import { adicionarSaldoConta, buscaSaldoConta, subtrairSaldoConta } from '../models/conta.model';

export const contaDeposito = async (codCliente: number, valor: number):
Promise<IMessage> => {
  const deposito: boolean = await adicionarSaldoConta(codCliente, valor);
  const saldo: number = await buscaSaldoConta(codCliente);

  if (deposito) {
    return { status: 201, message: `Depósito no valor de ${valor} reais feito com sucesso. Novo saldo de ${saldo} reais`}
  } else {
    return { status: 404, message: 'Erro ao tentar fazer o depósito. Tente novamente'};
  };
}

export const contaSaque = async (codCliente: number, valor: number):
Promise<IMessage> => {
  const saldo: number = await buscaSaldoConta(codCliente);

  if (saldo < valor) return { status: 404, message: `Não foi possível realizar o saque, pois seu saldo é de ${saldo} reais`}

  const saque : boolean = await subtrairSaldoConta(codCliente, valor);
  const novoSaldo: number = await buscaSaldoConta(codCliente);

  if (saque) {
    return { status: 201, message: `Saque no valor de ${valor} reais feito com sucesso. Novo saldo de ${novoSaldo} reais`}
  } else {
    return { status: 404, message: 'Erro ao tentar fazer o saque. Tente novamente'};
  };
}