import { RowDataPacket } from "mysql2";
import IAtivo from "../interfaces/IAtivo.interface";
import IAtivos from "../interfaces/IAtivos.interface";
import connection from "./connection";

export const buscarAtivoPeloCodAtivo = async (codAtivo: number):
Promise<IAtivo[]> => {
  const [ativo] = await connection.execute<RowDataPacket[]>(
    `SELECT * FROM investimentoAcoes.ativos
    WHERE codAtivo = ?`,
    [codAtivo]
  );

  return ativo as IAtivo[];
};

export const buscarCarteiraPeloCodCliente = async (codCliente: number):
Promise<IAtivos[]> => {
  const [ativos] = await connection.execute<RowDataPacket[]>(
    `SELECT cart.codCliente, cart.codAtivo, cart.qtdeAtivo, cli.codCliente, ativos.valor
    FROM investimentoAcoes.carteiras AS cart
    INNER JOIN investimentoAcoes.clientes AS cli
    ON cart.codCliente = cli.codCliente
    INNER JOIN investimentoAcoes.ativos AS ativos
    ON cart.codAtivo = ativos.codAtivo
    WHERE cli.codCliente = ?;`,
    [codCliente]
  );
    
  return ativos as IAtivos[];
};


