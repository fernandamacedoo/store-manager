const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');
const { allSalesWithSaleId } = require('../mocks/sales.mock');

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
        sinon.stub(salesService, 'getAll').resolves(allSalesWithSaleId);

        // Act
        await salesController.getAll(req, res);
        
        // Assert
        expect(res.status).to.be.calledWith(200);
        expect(res.json).to.be.calledWith(allSalesWithSaleId);
    },
);

    it(
    'Testa função findById com id válido: retorna status 200 e produto específico', 
    async function () {
        // Arrange
        sinon.stub(salesService, 'findById').resolves(allSalesWithSaleId[2]);

        // Act
        req.params = { id: 2 };
        await salesController.findById(req, res);
        
        // Assert
        expect(res.status).to.be.calledWith(200);
        expect(res.json).to.be.calledWith(allSalesWithSaleId[2]);
    },
);
    it(
    'Testa função findById com id inválido: retorna status 404 e mensagem de erro', 
    async function () {
        // Arrange
        sinon.stub(salesService, 'findById').resolves(false);
    
        // Act
        req.params = { id: 999999 };
        await salesController.findById(req, res);
            
        // Assert
        expect(res.status).to.be.calledWith(404);
        expect(res.json).to.be.calledWith({ message: 'Sale not found' });
        },
    );
});