const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');
const { allSalesWithSaleId, allSalesWithoutSaleId } = require('../mocks/sales.mock');

describe('Testa a camada Service das vendas', function () {
    afterEach(function () {
        sinon.restore();
    });
    it('Testa função getAll: retorna todas as vendas', async function () {
        // Arrange
        sinon.stub(salesModel, 'getAll').resolves(allSalesWithSaleId);

        // Act
        const result = await salesService.getAll();
        
        // Assert
        expect(result).to.be.deep.equal(allSalesWithSaleId);
    });
    it('Testa função findById: retorna a venda com o id passado no parâmetro', async function () {
        // Arrange
        sinon.stub(salesModel, 'findById').resolves(allSalesWithoutSaleId[2]);
        
        // Act
        const result = await salesService.findById(2);

        // Assert
        expect(result).to.be.deep.equal(allSalesWithoutSaleId[2]);
    });
    it('Testa função createSales: retorna um array com id e vendas', async function () {
        // Arrange
        const bodyContent = [{
            productId: 2,
            quantity: 3,
          },
          {
            productId: 1,
            quantity: 4,
          }];
        sinon.stub(salesModel, 'createSales').resolves(3);
        
        // Act
        const result = await salesService.createSales(bodyContent);
        
        // Assert
        expect(result).to.be.deep.equal({
            id: 3,
            itemsSold: bodyContent,
        });
    });
    it('Testa função createSales: sem campo productId', async function () {
        // Arrange
        const bodyContent = [{
            semProductId: 2,
            quantity: 3,
          },
          {
            productId: 1,
            quantity: 4,
          }];
        sinon.stub(salesModel, 'createSales').resolves(3);
        
        // Act
        const result = await salesService.createSales(bodyContent);
        
        // Assert
        expect(result).to.be.deep.equal({ message: '"[0].productId" is required' });
    });
    it('Testa função createSales: sem campo quantity', async function () {
        // Arrange
        const bodyContent = [{
            productId: 2,
            semQuantity: 3,
          },
          {
            productId: 1,
            quantity: 4,
          }];
        sinon.stub(salesModel, 'createSales').resolves(3);
        
        // Act
        const result = await salesService.createSales(bodyContent);
        
        // Assert
        expect(result).to.be.deep.equal({ message: '"[0].quantity" is required' });
    });
    it('Testa função createSales: com quantidade 0 ou negativa', async function () {
        // Arrange
        const bodyContent = [{
            productId: 2,
            quantity: 0,
          },
          {
            productId: 1,
            quantity: 4,
          }];
        sinon.stub(salesModel, 'createSales').resolves(3);
        
        // Act
        const result = await salesService.createSales(bodyContent);
        
        // Assert
        expect(result).to.be.deep.equal({ 
            message: '"[0].quantity" must be greater than or equal to 1', 
        });
    });
});