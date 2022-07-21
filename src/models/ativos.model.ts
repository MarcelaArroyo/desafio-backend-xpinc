import { RowDataPacket } from "mysql2";
import IAtivo from "../interfaces/IAtivo.interface";
import connection from "./connection";

export const buscarAtivoPeloCodAtivo = async (codAtivo: number):
Promise<IAtivo[]> => {
  const [ativo] = await connection.execute<RowDataPacket[]>(
    `SELECT * FROM investimentoAcoes.ativos
    WHERE codAtivo = ?`,
    [codAtivo]
  );

  return ativo as IAtivo[];
}
