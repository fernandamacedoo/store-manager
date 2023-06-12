const Joi = require('joi');

const productNameSchema = Joi.object({
    name: Joi.string().min(5).required(),
});

const newSaleSchema = Joi.array().items(Joi.object({
    productId: Joi.number().integer().required(),
    quantity: Joi.number().integer().min(1).required(),
}));

module.exports = {
    productNameSchema,
    newSaleSchema,
};