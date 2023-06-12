const { salesModel } = require('../models/index');
const { verifySale } = require('./validations/validations');

const getAll = async () => {
    const result = await salesModel.getAll();
    return result;
};

const findById = async (id) => {
    const result = await salesModel.findById(id);
    return result;
};

const createSales = async (body) => {
    const error = verifySale(body);
    if (error) { return { message: error.message }; }
    const saleId = await salesModel.createSales(body);
    return { id: saleId, itemsSold: body };
};

module.exports = { getAll, findById, createSales };