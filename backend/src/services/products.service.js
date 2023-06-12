const { productsModel } = require('../models/index');
const { verifyProductName } = require('./validations/validations');

const getAll = async () => {
    const result = await productsModel.getAll();
    return result;
};

const findById = async (id) => {
    const result = await productsModel.findById(id);
    return result;
};

const createProduct = async (name) => {
    const error = verifyProductName(name);
    if (error) { return error; }
    const productId = await productsModel.createProduct(name);
    const result = productsModel.findById(productId);
    return result;
};

const updateProduct = async (name, id) => {
    const error = verifyProductName(name);
    if (error) { return error; }
    await productsModel.updateProduct(name, id);
    const modifiedProduct = await productsModel.findById(id);
    return modifiedProduct;
};

module.exports = { getAll, findById, createProduct, updateProduct };