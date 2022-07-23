import { ResultSetHeader, RowDataPacket } from "mysql2";
import ICarteira from "../interfaces/ICarteira.interface";
import connection from "./connection";

const qtdeAtivoDisponivelCorretora = async (codAtivo: number):
Promise<number> => {
  const [qtdeAtivoDisponivel] = await connection.execute<RowDataPacket[]>(
    `SELECT qtdeAtivo FROM investimentoAcoes.ativos
    WHERE codAtivo = ?`,
    [codAtivo]
  );

  return +qtdeAtivoDisponivel[0].qtdeAtivo as number;
};

const calculaValorTotal = async (codAtivo: number, qtdeAtivo: number):
Promise<number> => {
  const [valorTotal] = await connection.execute<RowDataPacket[]>(
    `SELECT valor * ? as 'valorTotal' FROM investimentoAcoes.ativos
    WHERE codAtivo = ?`,
    [qtdeAtivo, codAtivo]
  );

  return +valorTotal[0].valorTotal;
};

const buscarCarteiraPorClienteEAtivo = async (codCliente: number, codAtivo: number):
Promise<ICarteira[]> => {
  const [carteira] = await connection.execute(
    `SELECT * FROM investimentoAcoes.carteiras
    WHERE codCliente = ? AND codAtivo = ?`,
    [codCliente, codAtivo]
  );
  
  return carteira as ICarteira[];
}

const atualizaCarteira = async (codCliente: number, codAtivo: number, qtdeAtivo: number):
Promise<boolean> => {
  const carteiraExiste: ICarteira[] = await buscarCarteiraPorClienteEAtivo(codCliente, codAtivo);
  

  if (carteiraExiste.length === 1) {
    return await adicionaQtdeAtivoCarteira (codCliente, codAtivo, qtdeAtivo);
  } else {
    return await criaNovaCarteira(codCliente, codAtivo, qtdeAtivo);
  }
};

const buscarVersaoCarteira = async (codCliente: number, codAtivo: number):
Promise<number> => {
  const [versao] = await connection.execute<RowDataPacket[]>(
    `SELECT versao FROM investimentoAcoes.carteiras
    WHERE codCliente = ? AND codAtivo = ?`,
    [codCliente, codAtivo]
  );
  
  return +versao[0].versao;
};

const adicionaQtdeAtivoCarteira = async (codCliente: number, codAtivo: number, qtdeAtivo: number):
Promise<boolean> => {
  const versao = await buscarVersaoCarteira(codCliente, codAtivo);

  const [atualizaCarteira] = await connection.execute<ResultSetHeader>(
    `UPDATE investimentoAcoes.carteiras
    SET qtdeAtivo = (qtdeAtivo + ?), versao = (versao + 1)
    WHERE codCliente = ? AND codAtivo = ? AND versao = ?`,
    [qtdeAtivo, codCliente, codAtivo, versao]
  );

  if (atualizaCarteira.affectedRows === 1) {
    await connection.execute('COMMIT;');
    return true;
  } else {
    await connection.execute('ROLLBACK;');
    return false;
  };
};

const subtrairQtdeAtivoCarteira = async (codCliente: number, codAtivo: number, qtdeAtivo: number):
Promise<boolean> => {
  const versao = await buscarVersaoCarteira(codCliente, codAtivo);

  const [atualizaCarteira] = await connection.execute<ResultSetHeader>(
    `UPDATE investimentoAcoes.carteiras
    SET qtdeAtivo = (qtdeAtivo - ?), versao = (versao + 1)
    WHERE codCliente = ? AND codAtivo = ? AND versao = ?`,
    [qtdeAtivo, codCliente, codAtivo, versao]
  );

  if (atualizaCarteira.affectedRows === 1) {
    await connection.execute('COMMIT;');
    return true;
  } else {
    await connection.execute('ROLLBACK;');
    return false;
  };
};

const criaNovaCarteira = async (codCliente: number, codAtivo: number, qtdeAtivo: number):
Promise<boolean> => {
  const [novaCarteira] = await connection.execute<ResultSetHeader>(
    `INSERT INTO investimentoAcoes.carteiras
    (codCliente, codAtivo, qtdeAtivo, versao)
    VALUES (?, ?, ?, ?)`,
    [codCliente, codAtivo, qtdeAtivo, 1]
  );


  return novaCarteira.affectedRows === 1 ? true : false
};

const adicionaCompraHistorico = async (codCliente: number, 
  codAtivo: number, qtdeAtivo: number, valorTotal: number):
  Promise<boolean> => {
  const [novoHistorico] = await connection.execute<ResultSetHeader>(
    `INSERT INTO investimentoAcoes.historicoTransacao
    (codCliente, codAtivo, qtdeAtivo, tipoTransacao, valor, data)
    VALUES (?, ?, ?, 'compra', ?, ?)`,
    [codCliente, codAtivo, qtdeAtivo, valorTotal, new Date]
  );

  return novoHistorico.affectedRows === 1 ? true : false;
};

const adicionaVendaHistorico = async (codCliente: number, 
  codAtivo: number, qtdeAtivo: number, valorTotal: number):
  Promise<boolean> => {
  const [novoHistorico] = await connection.execute<ResultSetHeader>(
    `INSERT INTO investimentoAcoes.historicoTransacao
    (codCliente, codAtivo, qtdeAtivo, tipoTransacao, valor, data)
    VALUES (?, ?, ?, 'venda', ?, ?)`,
    [codCliente, codAtivo, qtdeAtivo, valorTotal, new Date]
  );

  return novoHistorico.affectedRows === 1 ? true : false;
};

export default {
  qtdeAtivoDisponivelCorretora,
  calculaValorTotal,
  buscarCarteiraPorClienteEAtivo,
  atualizaCarteira,
  adicionaQtdeAtivoCarteira,
  subtrairQtdeAtivoCarteira,
  adicionaCompraHistorico,
  adicionaVendaHistorico,
}
