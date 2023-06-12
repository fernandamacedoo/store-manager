const { productNameSchema, newSaleSchema } = require('./schemas');

const verifyProductName = (name) => {
    const { error } = productNameSchema.validate({ name });
    if (error) { return { message: error.message }; }
};

const verifySale = (sale) => {
    const { error } = newSaleSchema.validate(sale);
    if (error) { return { message: error.message }; }
};

const validationSaleFields = (message, _req, res) => {
    if (message.includes('is required')) { 
        return res.status(400).json({ message }); 
    }
    if (message.includes('must be greater than or equal to 1')) { 
        return res.status(422).json({ message }); 
    }
    return res.status(404).json({ message: 'Unknown error' });
};

module.exports = { verifyProductName, verifySale, validationSaleFields };