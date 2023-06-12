const { Router } = require('express');
const { productsController } = require('../controllers/index');

const productsRouter = Router();

productsRouter.get('/', productsController.getAll);

productsRouter.get('/:id', productsController.findById);

productsRouter.post('/', productsController.createProduct);

productsRouter.put('/:id', productsController.updateProduct);

module.exports = productsRouter;