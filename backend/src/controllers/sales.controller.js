const { productsModel } = require('../models');
const { salesService } = require('../services/index');
const { validationSaleFields } = require('../services/validations/validations');

const getAll = async (_req, res) => {
    const result = await salesService.getAll();
    return res.status(200).json(result);
};

const findById = async (req, res) => {
    const { id } = req.params;
    const result = await salesService.findById(id);
    if (result.length === 0 || !result) {
         return res.status(404).json({ message: 'Sale not found' }); 
}
    return res.status(200).json(result);
};

const createSales = async (req, res) => {
    const { body } = req;
    const getAllProducts = await productsModel.getAll(); 
    const productsId = getAllProducts.map((product) => product.id);
    if (body.find((sale) => sale.productId && !productsId.includes(sale.productId))) {
        return res.status(404).json({ message: 'Product not found' });
    }
    const result = await salesService.createSales(body);
    if (!result) { return res.status(404); }
    if (!result.message) { return res.status(201).json(result); }
    const { message } = result;
    validationSaleFields(message, req, res);
};

module.exports = { getAll, findById, createSales };