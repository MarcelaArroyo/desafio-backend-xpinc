<h1>Desafio Técnico XP - Investimento de Ações</h1>

<h2>Descrição:</h2>
<p> O projeto Investimento de Ações é um backend no qual é possível realizar algumas ações que ocorrem dentro de uma corretora de valores. Neste projeto é possível:</p>

  - Autenticar um cliente.
  - Comprar ativos.
  - Vender ativos.
  - Buscar todos os ativos do cliente.
  - Buscar um ativo pelo seu código.
  - Depositar dinheiro na conta.
  - Sacar dinheiro da conta.  
  - Buscar todos os ativos do cliente.


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

<h3> Endpoint: POST /auth</h3>
Inicialmente são feitas verificações pelo Middleware para saber se os dados passados estão cumprindo os pré-requisitos.
As verificações feitas são:

* O email e password recebidos do body devem existir 
* O email e o password deve ser do tipo `string`
* O email deve possuir o formato correto, sendo ele, conter o caracter @
* O password deve possuir mais de 6 caracteres.

Após as verificações iniciais, serão validados se os dados passados pelo cliente estão corretos via service, validações como: senha correta, email já cadastrado no sistema, validações necessárias para deixar o usuário entrar no sistema.

Caso o cliente exista é gerado um token através da biblioteca `JasonWebToken` e esse token é retornado com um `status 200`.
<br>

Se o cliente não existir, a aplicação retorna `status 404` com a mensagem `Email e/ou senha inválido`.  

<h3>Endpoint: POST investimentos/comprar</h3>

Inicialmente são feitas verificações pelo Middleware para saber se os dados passados estão cumprindo os pré-requisitos.
As verificações feitas são:
* Verifica se token é válido, utilizando a biblioteca `JasonWebToken`
* Verifica se o `código do cliente, código do ativo e a quantidade do ativo` recebidos são do tipo `number` e se são valores maiores que 0.

Após as verificações iniciais, serão feitas validações para efetuar a compra do ativo.

#### Fluxo de compra do ativo

1. Verifica-se se a quantidade do ativo está disponível na corretora.
2. Verifica-se se o cliente possui saldo para efetuar essa compra.
3. Verifica-se se o cliente já possui o ativo em sua carteira.
  - Caso o cliente tenha o ativo na carteira, é incrementado a quantidade do ativo na carteira.
  - Caso não tenha o ativo, é inserido o ativo na carteira do cliente.
4. Retorna `status 201` com a mensagem `Compra efetuada com sucesso`.
5. Decrementa o valor da compra do saldo do cliente.

#### Quantidade de ativos indisponíveis na corretora
1. Verifica-se se a quantidade do ativo está disponível na corretora.
  * Caso não haja ativos suficientes para a compra, retorna `status 404` com a mensagem `Quantidade indisponível pela corretora`.

#### Saldo insuficiente
1. Verifica-se se a quantidade do ativo está disponível na corretora.
2. Verifica-se se o cliente possui saldo para efetuar essa compra.
  -  Caso não haja saldo para a compra, retorna `status 404` com a mensagem `Saldo insuficiente`.

#### Fluxo de erro ao realizar a compra do ativo

1. Verifica-se se a quantidade do ativo está disponível na corretora.
2. Verifica-se se o cliente possui saldo para efetuar essa compra.
3. Verifica-se se o cliente já possui o ativo em sua carteira.
  - Caso o cliente tenha o ativo na carteira, é incrementado a quantidade do ativo na carteira.
  - Caso não tenha o ativo, é inserido o ativo na carteira do cliente.
4. Erro ao realizar a ação acima. 
* Retorna `status 404` com a mensagem `Não foi possível realizar a compra do ativo`.

> Dado a topologia em questão, podem ocorrer acessos simultâneos feitos pela Web ou Mobile, gerando assim concorrência para o sistema. Para que as transações de compra sejam realizadas de forma correta, foi feito um Lock Otimista, onde é verificado que apenas um dispositivo irá conseguir realizar a transação.

<h3>Endpoint: POST investimentos/vender</h3>

Inicialmente são feitas verificações pelo Middleware para saber se os dados passados estão cumprindo os pré-requisitos.
As verificações feitas são:
* Verifica se token é válido, utilizando a biblioteca `JasonWebToken`
* Verifica se o `código do cliente, código do ativo e a quantidade do ativo` recebidos são do tipo `number` e se são valores maiores que 0.

Após as verificações iniciais, serão feitas validações para efetuar a venda do ativo.

#### Fluxo de venda do ativo

1. Verifica se o cliente possui o ativo na carteira.
2. Verifica se a quantidade de ativo é suficiente para a venda.
3. Efetua a venda do ativo, retorna o `status 201` e a mensagem `Venda efetuada com sucesso`.
4. Incrementa o saldo do cliente com o valor da venda.
5. Decrementa a quantidade do ativo da carteira do cliente. 

#### Ativo não existente
1. Verifica se o cliente possui o ativo na carteira.
* Se o ativo não existir, retorna `status 404` com a mensamge `Carteira não encontrada`

#### Quantidade de ativo insuficiente 

1. Verifica se o cliente possui o ativo na carteira.
2. Verifica se a quantidade de ativo é suficiente para a venda.
* Se a quantidade for insuficiente, retorna o `status 404` com a mensagem `Quantidade de ativo insuficiente para vender` 

#### Fluxo de erro durante a venda do ativo

1. Verifica se o cliente possui o ativo na carteira.
2. Verifica se a quantidade de ativo é suficiente para a venda.
3. Erro durante a venda do ativo, retorna o `status 404` e a mensagem `Não foi possível realizar a venda do ativo` 


> Dado a topologia em questão, podem ocorrer acessos simultâneos feitos pela Web ou Mobile, gerando assim concorrência para o sistema. Para que as transações de venda sejam realizadas de forma correta, foi feito um Lock Otimista, onde é verificado que apenas um dispositivo irá conseguir realizar a transação.

<h3>Endpoint: GET ativos/:codAtivo</h3>

<p> Para pegar o ativo pelo código é feito uma busca no banco de dados.</p>
- Se o ativo for encontrado é retornado um `status 200` e um `JSON` contendo { codAtivo, qtdeAtivo, valor}
- Se não for encontrado o respectivo ativo é retornado um `status 404` e a mensagem `Ativo não encontrado`.


<h3>Endpoint: GET ativos/cliente/:codCliente</h3>
<p> Para pegar os ativos pelo cliente é feito uma busca no banco de dados.</p>
- Se o cliente for encontrado é retornado um `status 200` e um `JSON` contendo [{ codCliente: 1, codAtivo: 1, qtdeAtivo: 10, valor: 10}], {codCliente: 1, codAtivo: 2, qtdeAtivo: 20, valor: 20} ... {}]
- Se não for encontrado o cliente é retornado um `status 404` e a mensagem `Cliente não encontrado`.

<h3>Endpoint: POST conta/deposito</h3>

Inicialmente são feitas verificações pelo Middleware para saber se os dados passados estão cumprindo os pré-requisitos. As verificações feitas são:
  - Verificação do token através da biblioteca `JasonWebToken`, também é analisado se o código do cliente e o valor recebidos do body existem, são do tipo `number` e se não são negativos ou igual a zero.
 
 Após as verificações iniciais, serão validados também: 
  - O saldo do cliente é atualizado na sua conta, mas para realizar a atualização é utilizado o lock otimista, para caso haja concorrencia apenas uma requisição consiga atualizar o saldo.
  - Se o saldo não for atualizado retorna um `status 404` com a mensagem `Erro ao tentar fazer o depósito. Tente novamente`.
  - Se o saldo for atualizado retorna `status 201` com a mensagem `Depósito no valor de {valor} reais feito com sucesso. Novo saldo de {saldo}`.

<h3>Endpoint: POST conta/saque</h3>
 
Inicialmente são feitas verificações pelo Middleware para saber se os dados passados estão cumprindo os pré-requisitos. As verificações feitas são:
  - Verificação do token através da biblioteca `JasonWebToken`, também é analisado se o código do cliente e o valor recebidos do body existem, são do tipo `number` e se não são negativos ou igual a zero.
  
Após as verificações iniciais, serão validados também: 
- Verifica se o cliente possui saldo suficiente em sua conta para poder realizar o saque. 
- Se o saldo for insuficiente retorna `status 404` com a mensagem `Não foi possível realizar o saque, pois seu saldo é de {saldo} reais`.
- Se o cliente possui saldo suficiente é utilizado o lock otimista para que não ocorra concorrência na atualização do saldo na conta. Se tiver conconrrência retorna `status 404` com a mensagem `Erro ao tentar fazer o saque. Tente novamente`.
- Se não, atualiza o saldo na conta e retorna um `status 201` com a mensagem `Saque no valor de { valor} reais feito com sucesso. Novo saldo de  {novoSaldo} reais`.

<h3>Endpoint: GET conta/:codCliente</h3>
Inicialmente são feitas verificações pelo Middleware para saber se os dados passados estão cumprindo os pré-requisitos. As verificações feitas são:
  - Verificação do token através da biblioteca `JasonWebToken`,

Após as verificações iniciais, serão validados também: 
  - Busca no banco de dados a conta do cliente pelo codCliente.
  - Se a conta não for encontrada retorna `status 404` com a mensagem `Conta não encontrada`.
  - Se a conta for encontrada retorna `status 200` e um `JSON` contendo {codCliente, saldo}.