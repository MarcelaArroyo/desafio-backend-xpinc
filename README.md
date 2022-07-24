<h1>Desafio Técnico XP - Investimento de Ações</h1>

<h2>Descrição:</h2>
<p> API onde o cliente é autenticado, consegue comprar e vender ativos, buscar o ativo pelo codAtivo,
buscar todos os ativos do cliente pelo codCliente, depositar e sacar dinheiro, e verificar sua conta.</p>

<h2>Linguagens, ferramentas e bibliotecas utilizadas:</h2>

  - node
  - typescript
  - express
  - mysql2
  - dotenv
  - nodemon
  - jsonwebtoken
  - mocha
  - chai
  - sinon
  
<h2>Para executar o projeto</h2>

 - docker-compose up -d
 - pedir o bash: docker exec -it desafio_backend_xp bash
 - npm install
 - configurar as variáveis de ambiente no .env:
   MYSQL_HOST
   MYSQL_USER
   MYSQL_PASSWORD
 - executar os comandos do arquivo InvestimentosAcoes no
 MySQL Workbench para criar o database.
 - npm start
 - npm run dev (para subir o projeto com nodemon)
 - npm run test
 
<h2>Endpoints:</h2>

<h3>Endpoint: POST /auth</h3>
    - Middleware para validar se o email e password recebidos do body existem, são do tipo string, email possui
    o formado correto e password possui mais de 6 caracteres.
    - Verifica no banco de dados se o cliente com o email e password existe. Se o cliente não existe, a aplicação
    retorna status 404 e uma mensagem 'Email e/ou senha inválido'. Se o cliente existe, é gerado um token através
    da biblioteca JasonWebToken e esse token é retornado com um status 200.

<h3>Endpoint: POST investimentos/comprar</h3>
  - Middleware que faz a verificação do token através da biblioteca JasonWebToken e verifica se codCliente,
  codAtivo e qtdeAtivo recebidos do body existem, são do tipo number e se não são negativos ou igual a zero.
  - Verificações:
    1.: Se a quantidade de ativo que o cliente quer comprar está disponível pela corretora. Se a
   corretora não possui ativo suficiente, retorna um status 404 e a mensagem 'Quantidade indisponível pela
   corretora'
    2.: Se o cliente possui saldo suficiente para poder realizar a compra dos ativos. Se não pussir,
   retorna um status 404 com a mensagem 'Saldo insuficiente'.
    3.: Se o cliente já possui uma carteira com o ativo. Se não possuir, é criada uma carteira nova
   do cliente, com o ativo e a quantidade de ativo. Se o cliente já possui uma carteria com esse ativo, a quantidade
   de ativo é atualizada.
   Obs.: Como o backend pode receber requisição de um aplicativo e de um site web ao mesmo tempo e isso pode
   gerar concorrência, onde a quantidade de ativo pode ser atualizada duas vezes. Quando
   a qtdeAtivo for atualizada é utilizado um lock otimista e verficado que apenas um dispositivo irá conseguir
   realizar a atualização.
   Se ocorreu tudo certo o saldo do cliente é atuzalido, a compra é adicionada no histórico de transação
   e é retornado um status 200 com a mensagem 'Compra efetuada com sucesso'.
   Se algo deu errado é retornado um status 404 com a mensagem 'Não foi possível realizar a compra do ativo'.

<h3>Endpoint: POST investimentos/vender</h3>
  - Middleware que faz a verificação do token através da biblioteca JasonWebToken e verifica se codCliente,
  codAtivo e qtdeAtivo recebidos do body existem, são do tipo number e se não são negativos ou igual a zero.
  - Verificações:
  1.: Se o cliente possui na carteira o ativo. Se o cliente não possuir o ativo, ou seja, não é
  possível vender um ativo sem der o mesmo. Então, retorna um status 404 com a mensagem 'Carteira não encontrada'.
  2.: Se o cliente possui o ativo é verificado se possui ativo suficiente para pode vender. Se não possuir,
  retorna um status 404 e a mensagem 'Quantidade de ativo insuficiente para vender'.
  3.: Se puder vender, na hora de atualizar a quantidade de ativo na carteira é utilizado o lock otimista e se tiver
  concorrência é retornado um status 404 com a mensagem 'Não foi possível realizar a venda do ativo'. Senão,
  a quantidade de ativo é atualizada na carteira do cliente, a venda é inserida no histórico de transação e
  é retornado um status 200 com a mensagem 'Venda efetuada com sucesso'.

<h3>Endpoint: GET ativos/:codAtivo</h3>
  - Busca no bando de dados o ativo pelo seu codAtivo.
  - Se não for encontrado o respectivo ativo é retornado um status 404 e a mensagem 'Ativo não encontrado'.
  - Se o ativo for encontrado é retornado um status 200 e um json {codAtivo, qtdeAtivo, valor}.

<h3>Endpoint: GET ativos/cliente/:codCliente</h3>
  - Busca no bando de dados todos os ativos que o cliente possui pelo codCliente.
  - Se o cliente não for encontrado retorna um status 404 com a mensagem 'Cliente não encontrado'.
  - Se o cliente for encontrado retorna um status 200 e um json, exemplo:
  [{codCliente: 1, codAtivo: 1, qtdeAtivo: 10, valor: 10}], {codCliente: 1, codAtivo: 2, qtdeAtivo: 20, valor: 20} ... {}].

<h3>Endpoint: POST conta/deposito</h3>
  - Middleware que faz a verificação do token através da biblioteca JasonWebToken e verifica se codCliente,
  e valor recebidos do body existem, são do tipo number e se não são negativos ou igual a zero.
  - O saldo do cliente é atualizado na sua conta, mas para realizar a atualização é utilizado o lock otimista,
  para caso haja concorrencia apenas uma requisição consiga atualizar o saldo.
  Se o saldo não for atualizado retorna um status 404 com a mensagem 'Erro ao tentar fazer o depósito. Tente novamente'.
  Se o saldo for atualizado retorna status 201 com a mensagem 'Depósito no valor de ${valor} reais feito com sucesso. Novo saldo de ${saldo}'.

<h3>Endpoint: POST conta/saque</h3>
  - Middleware que faz a verificação do token através da biblioteca JasonWebToken e verifica se codCliente,
  e valor recebidos do body existem, são do tipo number e se não são negativos ou igual a zero.
  - Verifica se o cliente possui saldo suficiente em sua conta para poder realizar o saque. Se o saldo
  for insuficiente retorna status 404 com a mensagem 'Não foi possível realizar o saque, pois seu saldo é de ${saldo} reais'.
  Se o cliente possui saldo suficiente é utilizado o lock otimista para que não ocorra concorrência na atualização
  do saldo na conta. Se tiver conconrrência retorna status 404 com a mensagem 'Erro ao tentar fazer o saque. Tente novamente'.
  Se não, atualiza o saldo na conta e retorna um status 201 com a mensagem 'Saque no valor de ${valor} reais feito com sucesso. Novo saldo de ${novoSaldo} reais'.

<h3>Endpoint: GET conta/:codCliente</h3>
  - Middleware para verificar o token atráves da biblioteca JasonWebToken.
  - Busca no banco de dados a conta do cliente pelo codCliente.
  - Se a conta não for encontrada retorna status 404 'Conta não encontrada'.
  - Se a conta for encontrada retorna status 200 e um json {codCliente, saldo}.
  