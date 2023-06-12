const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const productsModel = require('../../../src/models/products.model');
const { allProducts } = require('../mocks/products.mock');
const connection = require('../../../src/models/connection');

describe('Testa a camada Model dos produtos', function () {
    afterEach(function () {
        sinon.restore();
    });
    it('Testa função getAll: retorna todos os produtos', async function () {
        // Arrange
        sinon.stub(connection, 'execute').resolves([allProducts]);
        
        // Act
        const result = await productsModel.getAll();

        // Assert
        expect(result).to.be.deep.equal(allProducts);
    });
    it('Testa função findById: retorna o produto com o id passado no parâmetro', async function () {
        // Arrange
        sinon.stub(connection, 'execute').resolves([allProducts]);
        
        // Act
        const result = await productsModel.findById(1);

        // Assert
        expect(result).to.be.deep.equal(allProducts[0]);
    });
    it('Testa função createProduct: retorna o id do produto criado', async function () {
        const bodyContent = { name: 'Chicote da Mulher Maravilha' };
        // Arrange
        sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
        
        // Act
        const result = await productsModel.createProduct(bodyContent);

        // Assert
        expect(result).to.be.deep.equal(4);
    });
    it('Testa função updateProduct: retorna o id do produto criado', async function () {
        const bodyContent = { name: 'Chicote da Mulher Maravilha' };
        // Arrange
        sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
        
        // Act
        const result = await productsModel.updateProduct(bodyContent);

        // Assert
        expect(result).to.be.deep.equal(1);
    });
});