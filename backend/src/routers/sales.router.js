const { Router } = require('express');
const { salesController } = require('../controllers/index');

const salesRouter = Router();

salesRouter.get('/', salesController.getAll);

salesRouter.get('/:id', salesController.findById);

salesRouter.post('/', salesController.createSales);

module.exports = salesRouter;