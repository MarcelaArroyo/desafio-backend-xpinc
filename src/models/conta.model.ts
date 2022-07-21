import { ResultSetHeader, RowDataPacket } from "mysql2";
import connection from "./connection";

export const buscaSaldoConta = async (codCliente: number):
Promise<number> => {
  const [saldo] = await connection.execute<RowDataPacket[]>(
    `SELECT saldo FROM investimentoAcoes.contasInvestimento
    WHERE codCliente = ?`,
    [codCliente]
  );

  return +saldo[0].saldo;
};

const buscarVersaoConta = async (codCliente: number):
Promise<number> => {
  const [versao] = await connection.execute<RowDataPacket[]>(
    `SELECT versao FROM investimentoAcoes.contasInvestimento
    WHERE codCliente = ?`,
    [codCliente]
  );
  
  return +versao[0].versao;
};

export const subtrairSaldoConta = async (codCliente: number, valorTotal: number):
Promise<boolean> => {
  const versao = await buscarVersaoConta(codCliente);

  const [rows] = await connection.execute<ResultSetHeader>(
    `UPDATE investimentoAcoes.contasInvestimento
    SET saldo = (saldo - ?), versao = (versao + 1)
    WHERE codCliente = ? AND versao = ?`,
    [valorTotal, codCliente, versao]
  );

  if (rows.affectedRows === 1) {
    await connection.execute('COMMIT;');
    return true;
  } else {
    await connection.execute('ROLLBACK;');
    return false;
  };
};

export const adicionarSaldoConta = async (codCliente: number, valorTotal: number):
Promise<boolean> => {
  const versao = await buscarVersaoConta(codCliente);

  const [rows] = await connection.execute<ResultSetHeader>(
    `UPDATE investimentoAcoes.contasInvestimento
    SET saldo = (saldo + ?), versao = (versao + 1)
    WHERE codCliente = ? AND versao = ?`,
    [valorTotal, codCliente, versao]
  );

  if (rows.affectedRows === 1) {
    await connection.execute('COMMIT;');
    return true;
  } else {
    await connection.execute('ROLLBACK;');
    return false;
  };
};