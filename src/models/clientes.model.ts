import { RowDataPacket } from 'mysql2';
import connection from './connection';

const buscarClientePorEmailSenha = async (email: string, password: string):
Promise<RowDataPacket[]> => {
  const [cliente] = await connection.execute<RowDataPacket[]>(
    `SELECT codCliente, nome, email FROM investimentoAcoes.clientes
    WHERE email = ? AND password = ?`,
    [email, password]
  );
  
  return cliente;
};

export default {
  buscarClientePorEmailSenha,
}