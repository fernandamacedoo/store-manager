const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');
const { allProducts } = require('../mocks/products.mock');

describe('Testa a camada Service dos produtos', function () {
    afterEach(function () {
        sinon.restore();
    });
    it('Testa função getAll: retorna todos os produtos', async function () {
        // Arrange
        sinon.stub(productsModel, 'getAll').resolves(allProducts);

        // Act
        const result = await productsService.getAll();
        
        // Assert
        expect(result).to.be.deep.equal(allProducts);
    });
    it('Testa função findById: retorna o produto com o id passado no parâmetro', async function () {
        // Arrange
        sinon.stub(productsModel, 'findById').resolves(allProducts[0]);
        
        // Act
        const result = await productsService.findById(1);

        // Assert
        expect(result).to.be.deep.equal(allProducts[0]);
    });
    it('Testa função createProduct: retorna o novo produto', async function () {
        // Arrange
        sinon.stub(productsModel, 'createProduct').resolves(allProducts[0]);
        sinon.stub(productsModel, 'findById').resolves(allProducts[0]);
        
        // Act
        const result = await productsService.createProduct(allProducts[0].name);
        
        // Assert
        expect(result).to.be.deep.equal(allProducts[0]);
    });
    it('Testa função updateProduct: retorna o novo produto', async function () {
        // Arrange
        sinon.stub(productsModel, 'updateProduct').resolves(1);
        sinon.stub(productsModel, 'findById').resolves({
            id: 1,
            name: 'Chicote da Mulher Maravilha',
          });
        
        // Act
        const result = await productsService.updateProduct('Chicote da Mulher Maravilha', 1);
        
        // Assert
        expect(result).to.be.deep.equal({
            id: 1,
            name: 'Chicote da Mulher Maravilha',
          });
    });
    it('Testa função updateProduct - Validação 1: nome pequeno', async function () {
        // Arrange
        
        // Act
        const result = await productsService.updateProduct('1234', 1);
        
        // Assert
        expect(result).to.be.deep.equal({
            message: '"name" length must be at least 5 characters long',
          });
    });
    it('Testa função updateProduct - Validação 2: sem campo name', async function () {
        // Arrange
        
        // Act
        const result = await productsService.updateProduct(undefined, 1);
        
        // Assert
        expect(result).to.be.deep.equal({
            message: '"name" is required',
          });
    });
});