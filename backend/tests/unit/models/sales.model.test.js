const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const salesModel = require('../../../src/models/sales.model');
const { allSalesWithSaleId, allSalesWithoutSaleId } = require('../mocks/sales.mock');
const connection = require('../../../src/models/connection');

describe('Testa a camada Model das vendas', function () {
    afterEach(function () {
        sinon.restore();
    });
    it('Testa função getAll: retorna todas as vendas', async function () {
        // Arrange
        sinon.stub(connection, 'execute').resolves([allSalesWithSaleId]);
        
        // Act
        const result = await salesModel.getAll();

        // Assert
        expect(result).to.be.deep.equal(allSalesWithSaleId);
    });
    it('Testa função findById: retorna a venda com o id passado no parâmetro', async function () {
        // Arrange
        sinon.stub(connection, 'execute').resolves([allSalesWithoutSaleId[2]]);
        
        // Act
        const result = await salesModel.findById(2);

        // Assert
        expect(result).to.be.deep.equal(allSalesWithoutSaleId[2]);
    });
    it('Testa função createSales: retorna o id da venda criada', async function () {
        const bodyContent = [{
            productId: 2,
            quantity: 3,
          },
          {
            productId: 1,
            quantity: 4,
          }];

        // Arrange
        sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
        
        // Act
        const result = await salesModel.createSales(bodyContent);

        // Assert
        expect(result).to.be.deep.equal(3);
    });
});