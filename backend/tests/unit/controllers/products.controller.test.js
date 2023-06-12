const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');
const { allProducts } = require('../mocks/products.mock');

describe('Testa a camada Controller dos produtos', function () {
    const req = {};
    const res = {};

    beforeEach(function () {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
    });

    afterEach(function () {
        sinon.restore();
    });

    it(
    'Testa função getAll: retorna status 200 e json com todos os produtos',
    async function () {
        // Arrange
        sinon.stub(productsService, 'getAll').resolves(allProducts);

        // Act
        await productsController.getAll(req, res);
        
        // Assert
        expect(res.status).to.be.calledWith(200);
        expect(res.json).to.be.calledWith(allProducts);
    },
    );

    it(
    'Testa função findById com id válido: retorna status 200 e produto específico', 
    async function () {
        // Arrange
        sinon.stub(productsService, 'findById').resolves(allProducts[0]);

        // Act
        req.params = { id: 1 };
        await productsController.findById(req, res);
        
        // Assert
        expect(res.status).to.be.calledWith(200);
        expect(res.json).to.be.calledWith(allProducts[0]);
    },
    );
    it(
    'Testa função findById com id inválido: retorna status 404 e mensagem de erro', 
    async function () {
        // Arrange
        sinon.stub(productsService, 'findById').resolves(undefined);
    
        // Act
        req.params = { id: 999999 };
        await productsController.findById(req, res);
            
        // Assert
        expect(res.status).to.be.calledWith(404);
        expect(res.json).to.be.calledWith({ message: 'Product not found' });
        },
    );
    it(
    'Testa função createProduct: retorna status 200 com novo produto', 
    async function () {
        const newProductReturn = {
            id: 4,
            name: 'Colar de ouro',
        };
        const bodyContent = { name: 'Chicote da Mulher Maravilha' };

        // Arrange
        sinon.stub(productsService, 'createProduct')
        .resolves(newProductReturn);
        
        // Act
        req.body = bodyContent;
        await productsController.createProduct(req, res);
                
        // Assert
        expect(res.status).to.be.calledWith(201);
        expect(res.json).to.be.calledWith(newProductReturn);
        },
    );
    it(
    'Testa validação 1: createProduct recebendo um name com menos de 5 caracteres', 
    async function () {
        const bodyContent = {
            name: '1234',
        };
    
        // Arrange
    sinon.stub(productsService, 'createProduct')
    .resolves({
            message: '"name" length must be at least 5 characters long',
        });

        // Act
        req.body = bodyContent;
        await productsController.createProduct(req, res);
                    
        // Assert
        expect(res.status).to.be.calledWith(400);
        expect(res.json).to.be.calledWith({
            message: '"name" length must be at least 5 characters long',
            });
        },
    );
    it(
    'Testa validação 2: createProduct não recebe campo name', 
    async function () {
        const bodyContent = {
            nae: 'Colar de ouro',
            };
        
        // Arrange    
        sinon.stub(productsService, 'createProduct')
        .resolves({ message: '"name" is required' });
    
        // Act
        req.body = bodyContent;
        await productsController.createProduct(req, res);
                        
        // Assert
        expect(res.status).to.be.calledWith(400);
        expect(res.json).to.be.calledWith({ message: '"name" is required' });
        },
    );
});