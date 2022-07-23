import IConta from '../interfaces/IConta';
import IMessage from '../interfaces/IMessage.interface';
import contaModel from '../models/conta.model';

const contaDeposito = async (codCliente: number, valor: number):
Promise<IMessage> => {
  const deposito: boolean = await contaModel.adicionarSaldoConta(codCliente, valor);
  const saldo: number = await contaModel.buscaSaldoConta(codCliente);

  if (deposito) {
    return { status: 201, message: `Depósito no valor de ${valor} reais feito com sucesso. Novo saldo de ${saldo} reais`}
  } else {
    return { status: 404, message: 'Erro ao tentar fazer o depósito. Tente novamente'};
  };
};

const contaSaque = async (codCliente: number, valor: number):
Promise<IMessage> => {
  const saldo: number = await contaModel.buscaSaldoConta(codCliente);

  if (saldo < valor) return { status: 404, message: `Não foi possível realizar o saque, pois seu saldo é de ${saldo} reais`}

  const saque : boolean = await contaModel.subtrairSaldoConta(codCliente, valor);
  const novoSaldo: number = await contaModel.buscaSaldoConta(codCliente);

  if (saque) {
    return { status: 201, message: `Saque no valor de ${valor} reais feito com sucesso. Novo saldo de ${novoSaldo} reais`}
  } else {
    return { status: 404, message: 'Erro ao tentar fazer o saque. Tente novamente'};
  };
};

const contaCliente = async (codCliente: number):
Promise<IConta | undefined> => {
  const conta = await contaModel.buscaConta(codCliente);

  if (conta.length === 0) return undefined;

  return {
    codCliente: conta[0].codCliente,
    saldo: +conta[0].saldo
  };
};

export default {
  contaDeposito,
  contaSaque,
  contaCliente
}