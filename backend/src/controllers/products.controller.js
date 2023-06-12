const { productsService } = require('../services/index');

const getAll = async (_req, res) => {
    const result = await productsService.getAll();
    return res.status(200).json(result);
};

const findById = async (req, res) => {
    const { id } = req.params;
    const result = await productsService.findById(id);
    if (!result) { return res.status(404).json({ message: 'Product not found' }); }
    return res.status(200).json(result);
};

const createProduct = async (req, res) => {
    const { name } = req.body;
    const result = await productsService.createProduct(name);
    if (result.message) { return res.status(400).json(result); }
    return res.status(201).json(result);
};

const updateProduct = async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    const findId = await productsService.findById(id);
    if (!findId) { return res.status(404).json({ message: 'Product not found' }); }   
    const result = await productsService.updateProduct(name, id);
    if (result.message) { return res.status(400).json(result); }
    return res.status(200).json(result); 
};

module.exports = { getAll, findById, createProduct, updateProduct };