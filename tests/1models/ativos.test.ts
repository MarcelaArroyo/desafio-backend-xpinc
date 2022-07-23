import { expect } from 'chai';
import sinon from 'sinon';
import connection from '../../src/models/connection';
import ativosModel from '../../src/models/ativos.model';

// Testando a função buscarAtivoPeloCodAtivo:

describe('Busca o ativo no banco de dados pelo codAtivo', () => {
  describe('Quando não existe o ativo cadastrado', () => {
    const arrayVazio: any = [[]];

    before(() => sinon.stub(connection, 'execute').resolves(arrayVazio))

    after(() => (connection.execute as sinon.SinonStub).restore());

    it('O array está vazio', async () => {
      const ativo = await ativosModel.buscarAtivoPeloCodAtivo(999);
      expect(ativo).to.be.empty;
    });
  });

  describe('Quando existe o ativo cadastrado', () => {
    const arrayAtivo: any = [
      [{
      codAtivo: 1,
      nome: 'AZUL4',
      valor: 12.19,
      qtdeAtivo: 100,
      }]
    ];

    before(() => sinon.stub(connection, 'execute').resolves(arrayAtivo))

    after(() => (connection.execute as sinon.SinonStub).restore());

    it('O array não está vázio', async () => {
      const ativo = await ativosModel.buscarAtivoPeloCodAtivo(1);
      expect(ativo).to.not.be.empty;
    });
    it('O array pussui um item do tipo objeto', async () => {
      const ativo = await ativosModel.buscarAtivoPeloCodAtivo(1);
      expect(ativo[0]).to.be.an('object');
    });
    it('O obejto possui as propriedades: "codAtivo", "nome", "valor", "qtdeAtivo"', async () => {
      const ativo = await ativosModel.buscarAtivoPeloCodAtivo(1);
      expect(ativo[0]).to.include.all.keys('codAtivo', 'nome', 'valor', 'qtdeAtivo');
    });
  });
});

// Testando a função buscarCarteiraPeloCodCliente

describe('Buscar os ativos no banco de dados pelo codCliente', () => {
  describe('Quando não existe o cliente', async () => {
    const arrayVazio: any = [[]];

    before(() => sinon.stub(connection, 'execute').resolves(arrayVazio));
    after(() => (connection.execute as sinon.SinonStub).restore());

    it('Retorna array vazio', async () => {
      const ativos = await ativosModel.buscarCarteiraPeloCodCliente(999);
      expect(ativos).to.be.empty;
    });
  });

  describe('Quando existe o cliente', async () => {
    const ativosDoCliente: any = [[{
      codCliente: 1,
      codAtivo: 2,
      qtdeAtivo: 30,
      valor: 27.96
      }, {
        codCliente: 1,
        codAtivo: 4,
        qtdeAtivo: 50,
        valor: 17.77
      }
    ]];

    before(() => sinon.stub(connection, 'execute').resolves(ativosDoCliente));
    after(() => (connection.execute as sinon.SinonStub).restore());

    it('Retorna um array de objetos', async () => {
      const ativos: any = await ativosModel.buscarCarteiraPeloCodCliente(1);
      expect(ativos).to.be.an('array');
      ativos.forEach((el: any) => expect(el).to.be.an('object'));
    });

    it('Os objetos possuem as propriedades: "codCliente", "codAtivo", "qtdeAtivo", "valor"', async () => {
      const ativos: any = await ativosModel.buscarCarteiraPeloCodCliente(1);
      ativos.forEach((el: any) => expect(el).to.include.all.keys(
        'codCliente', 'codAtivo', 'qtdeAtivo', 'valor'
      ));
    });
  });
});