import connection from "./connection";

export const buscaSaldoConta = async (codCliente: number):
Promise<number> => {
  const [saldo]: any = await connection.execute(
    `SELECT saldo FROM investimentoAcoes.contasInvestimento
    WHERE codCliente = ?`,
    [codCliente]
  );

  return +saldo[0].saldo;
};

const buscarVersaoConta = async (codCliente: number):
Promise<number> => {
  const [versao]: any = await connection.execute(
    `SELECT versao FROM investimentoAcoes.contasInvestimento
    WHERE codCliente = ?`,
    [codCliente]
  );
  
  return +versao[0].versao;
};

export const atualizaSaldoConta = async (codCliente: number, valorTotal: number):
Promise<boolean> => {
  const versao = await buscarVersaoConta(codCliente);

  const [rows]: any = await connection.execute(
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