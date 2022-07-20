// import { ResultSetHeader, RowDataPacket } from "mysql2";
import IQtdeAtivo from "../interfaces/IMessage.interface";
import connection from "./connection";

export const qtdeAtivoDisponivelCorretora = async (codAtivo: number):
Promise<number> => {
  const [qtdeAtivoDisponivel]: any = await connection.execute(
    `SELECT qtdeAtivo FROM investimentoAcoes.ativos
    WHERE codAtivo = ?`,
    [codAtivo]
  );

  return +qtdeAtivoDisponivel[0].qtdeAtivo as number;
};

export const calculaValorTotal = async (codAtivo: number, qtdeAtivo: number):
Promise<number> => {
  const [valorTotal]: any = await connection.execute(
    `SELECT valor * ? as 'valorTotal' FROM investimentoAcoes.ativos
    WHERE codAtivo = ?`,
    [qtdeAtivo, codAtivo]
  );

  return +valorTotal[0].valorTotal;
};

export const atualizaCarteira = async (codCliente: number, codAtivo: number, qtdeAtivo: number):
Promise<boolean> => {
  const [carteiraExiste]: any = await connection.execute(
    `SELECT * FROM investimentoAcoes.carteiras
    WHERE codCliente = ? AND codAtivo = ?`,
    [codCliente, codAtivo]
  );

  if (carteiraExiste.length !== 0) {
    return await atualizaQtdeAtivoCarteira (codCliente, codAtivo, qtdeAtivo);
  } else {
    return await criaNovaCarteira(codCliente, codAtivo, qtdeAtivo);
  }
};

const buscarVersaoCarteira = async (codCliente: number, codAtivo: number):
Promise<number> => {
  const [versao]: any = await connection.execute(
    `SELECT versao FROM investimentoAcoes.carteiras
    WHERE codCliente = ? AND codAtivo = ?`,
    [codCliente, codAtivo]
  );
  
  return +versao[0].versao;
};

export const atualizaQtdeAtivoCarteira = async (codCliente: number, codAtivo: number, qtdeAtivo: number):
Promise<boolean> => {
  const versao = await buscarVersaoCarteira(codCliente, codAtivo);

  const [rows]: any = await connection.execute(
    `UPDATE investimentoAcoes.carteiras
    SET qtdeAtivo = (qtdeAtivo + ?), versao = (versao + 1)
    WHERE codCliente = ? AND codAtivo = ? AND versao = ?`,
    [qtdeAtivo, codCliente, codAtivo, versao]
  );

  if (rows.affectedRows === 1) {
    await connection.execute('COMMIT;');
    return true;
  } else {
    await connection.execute('ROLLBACK;');
    return false;
  };
};

export const criaNovaCarteira = async (codCliente: number, codAtivo: number, qtdeAtivo: number):
Promise<boolean> => {
  const [novaCarteira]: any = await connection.execute(
    `INSERT INTO investimentoAcoes.carteiras
    (codCliente, codAtivo, qtdeAtivo, versao)
    VALUES (?, ?, ?, ?)`,
    [codCliente, codAtivo, qtdeAtivo, 1]
  );


  return novaCarteira.affectedRows === 1 ? true : false
};

export const adicionaCompraHistorico = async (codCliente: number, 
  codAtivo: number, qtdeAtivo: number, valorTotal: number):
  Promise<boolean> => {
  const [novaTransacao]: any = await connection.execute(
    `INSERT INTO investimentoAcoes.historicoTransacao
    (codCliente, codAtivo, qtdeAtivo, tipoTransacao, valor, data)
    VALUES (?, ?, ?, 'compra', ?, ?)`,
    [codCliente, codAtivo, qtdeAtivo, valorTotal, new Date]
  );

  return novaTransacao.affectedRows === 1 ? true : false;
};
