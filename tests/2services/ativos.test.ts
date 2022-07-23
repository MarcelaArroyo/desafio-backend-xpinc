import { expect } from 'chai';
import sinon from 'sinon';
import ativosModel from '../../src/models/ativos.model';
import ativosService from '../../src/services/ativos.service';

// Testando a função buscarAtivoPeloCodAtivo

describe('Busca o ativo no model pelo codAtivo', () => {
  describe('Quando não existe o ativo', () => {
    const arrayVazio: any = [];

    before(() => sinon.stub(ativosModel, 'buscarAtivoPeloCodAtivo').resolves(arrayVazio))
    after(() => (ativosModel.buscarAtivoPeloCodAtivo as sinon.SinonStub).restore());

    it('Retorna "undefined"', async () => {
      const ativo = await ativosService.ativoPeloCodAtivo(999);
      expect(ativo).to.be.undefined;
    });
  });

  describe('Quando existe o ativo', () => {
    const objAtivo: any = {
      codAtivo: 1,
      qtdeAtivo: 100,
      valor: 12.19,
    };

    before(() => sinon.stub(ativosModel, 'buscarAtivoPeloCodAtivo').resolves([objAtivo]));
    after(() => (ativosModel.buscarAtivoPeloCodAtivo as sinon.SinonStub).restore());

    it('Retorna um objeto', async () => {
      const ativo = await ativosService.ativoPeloCodAtivo(1);
      expect(ativo).to.be.an('object');
    });

    it('O objeto possui as propriedades: "codAtivo", "qtdeAtivo", "valor"', async () => {
      const ativo = await ativosService.ativoPeloCodAtivo(1);
      expect(ativo).to.include.all.keys('codAtivo', 'qtdeAtivo', 'valor');
    })
  })
});

// Testando a função buscarCarteiraPeloCodCliente

describe('Buscar os ativos no model pelo codCliente', () => {
  describe('Quando não existe o cliente', async () => {
    const arrayVazio: any = [];

    before(() => sinon.stub(ativosModel, 'buscarCarteiraPeloCodCliente').resolves(arrayVazio));
    after(() => (ativosModel.buscarCarteiraPeloCodCliente as sinon.SinonStub).restore());

    it('Retorna "undefined"', async () => {
      const ativos = await ativosService.ativosPeloCodCliente(999);
      expect(ativos).to.be.undefined;
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

    before(() => sinon.stub(ativosModel, 'buscarCarteiraPeloCodCliente').resolves(ativosDoCliente));
    after(() => (ativosModel.buscarCarteiraPeloCodCliente as sinon.SinonStub).restore());

    it('Retorna um array de objetos', async () => {
      const ativos: any = await ativosService.ativosPeloCodCliente(1);
      expect(ativos).to.be.an('array');
      ativos.forEach((el: any) => expect(el).to.be.an('object'));
    });

    it('Os objetos possuem as propriedades: "codCliente", "codAtivo", "qtdeAtivo", "valor"', async () => {
      const ativos: any = await ativosService.ativosPeloCodCliente(1);
      ativos.forEach((el: any) => expect(el).to.include.all.keys(
        'codCliente', 'codAtivo', 'qtdeAtivo', 'valor'
      ));
    });
  });
});