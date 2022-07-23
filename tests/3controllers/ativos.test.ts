import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import ativosService from '../../src/services/ativos.service';
import app from '../../app';

chai.use(chaiHttp);
const { expect } = chai;

// Testando a função ativoPeloCodAtivo

describe('Buscar o ativo no service pelo codAtivo', () => {
  describe('Quando não existe o ativo', async () => {

    before(() => sinon.stub(ativosService, 'ativoPeloCodAtivo').resolves(undefined));
    after(() => (ativosService.ativoPeloCodAtivo as sinon.SinonStub).restore());

    it('Retorna status 404 e mensagem "Ativo não encontrado"', async () => {
      const { status, body } = await chai.request(app).get('/ativos/999');
      expect(status).to.be.equal(404);
      expect(body).to.be.an('object');
      expect(body.message).to.be.equal('Ativo não encontrado');
    });
  });

  describe('Quando existe o ativo', async () => {
    const objAtivo: any = {
      codAtivo: 1,
      qtdeAtivo: 100,
      valor: 12.19,
    }

    before(() => sinon.stub(ativosService, 'ativoPeloCodAtivo').resolves(objAtivo));
    after(() => (ativosService.ativoPeloCodAtivo as sinon.SinonStub).restore());

    it('Retorna status 200 e no body um objeto contendo as propriedades: "codAtivo", "qtdeAtivo", "valor"', async () => {
      const { status, body } = await chai.request(app).get('/ativos/1');
      expect(status).to.be.equal(200);
      expect(body).to.be.an('object');
      expect(body).to.include.all.keys('codAtivo', 'qtdeAtivo', 'valor');
    });
  });
});

// Testando a função ativosPeloCodCliente

describe('Buscar os ativos no service pelo codCliente', () => {
  describe('Quando não existe o cliente', async () => {
    before(() => sinon.stub(ativosService, 'ativosPeloCodCliente').resolves(undefined));
    after(() => (ativosService.ativosPeloCodCliente as sinon.SinonStub).restore());

    it('Retorna status 404 e mensagem "Cliente não encontrado"', async () => {
      const { status, body } = await chai.request(app).get('/ativos/cliente/999');
      expect(status).to.be.equal(404);
      expect(body).to.be.an('object');
      expect(body.message).to.be.equal('Cliente não encontrado');
    });
  });

  describe('Quando existe o cliente', async () => {
    const ativosDoCliente: any = [{
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
    ];

    before(() => sinon.stub(ativosService, 'ativoPeloCodAtivo').resolves(ativosDoCliente));
    after(() => (ativosService.ativoPeloCodAtivo as sinon.SinonStub).restore());

    it('Retorna status 200 e no body retorna um array não vazio', async () => {
      const { status, body } = await chai.request(app).get('/ativos/cliente/1');
      expect(status).to.be.equal(200);
      expect(body).to.be.an('array');
      expect(body).to.not.be.empty;
    });

    it('Os elementos do array sejam do tipo objeto e tenha as proriedades "codCliente", "codAtivo", "qtdeAtivo", "valor"',
    async () => {
      const { status, body } = await chai.request(app).get('/ativos/cliente/1');
      expect(status).to.be.equal(200);
      body.forEach((el: any) => expect(el).to.be.an('object'));
      body.forEach((el: any) => expect(el).to.include.all.keys(
        'codCliente', 'codAtivo', 'qtdeAtivo', 'valor'
      ));
    });
  });
});