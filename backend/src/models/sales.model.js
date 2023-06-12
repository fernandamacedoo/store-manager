const connection = require('./connection');

const getAll = async () => {
    const command = `
        SELECT 
            sp.sale_id AS saleId,
            s.date AS date,
            sp.product_id AS productId,
            sp.quantity AS quantity
        FROM
            sales_products AS sp
                INNER JOIN
            products AS p ON sp.product_id = p.id
                INNER JOIN
            sales AS s ON sp.sale_id = s.id
        ORDER BY saleId, productId
    `;
    const [result] = await connection.execute(command);
    return result;
};

const findById = async (id) => {
    const command = `
    SELECT 
        s.date AS date,
        sp.product_id AS productId,
        sp.quantity AS quantity
    FROM
        sales_products AS sp
            INNER JOIN
        products AS p ON sp.product_id = p.id
            INNER JOIN
        sales AS s ON sp.sale_id = s.id
    WHERE sp.sale_id = ?
    ORDER BY productId`;
    const [result] = await connection.execute(command, [id]);
    return result;
};

const createNewSale = async () => {
    const command = 'INSERT INTO sales (date) VALUES(date(now()))';
    const [{ insertId }] = await connection.execute(command);
    return insertId;
};

const createSales = async (body) => {
    const commandId = 'INSERT INTO sales (date) VALUES(date(now()))';
    const [{ insertId }] = await connection.execute(commandId);

    const commandAddSale = `
    INSERT INTO sales_products (sale_id, product_id, quantity) VALUES(?, ?, ?)`;
    const result = body.map(({ productId, quantity }) => connection
    .execute(commandAddSale, [insertId, productId, quantity]));

    await Promise.all(result);
    
    return insertId;
};

module.exports = { getAll, findById, createSales, createNewSale };