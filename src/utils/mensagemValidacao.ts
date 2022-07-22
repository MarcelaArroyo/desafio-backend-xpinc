enum Mensagem {
  REQUERIDA = 'é necessário',
  TEXTO = 'deve ser um texto',
  NUMERO = 'deve ser um número',
  MIN_NUMERO = 'não pode ser negativo ou igual a zero',
  MIN_PASSWORD = 'deve ter pelo menos 6 caracteres',
  EMAIL = 'Email não válido'
}

export default Mensagem;