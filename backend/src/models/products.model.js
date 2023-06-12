const connection = require('./connection');

const getAll = async () => {
    const [result] = await connection.execute('SELECT * FROM products');
    return result;
};

const findById = async (id) => {
    const [[result]] = await connection.execute(
        'SELECT * FROM products WHERE id = ?',
        [id],
    );
    return result;
};

const createProduct = async (name) => {
    const command = 'INSERT INTO products (name) VALUES(?)';
    const [{ insertId }] = await connection.execute(command, [name]);
    return insertId;
};

const updateProduct = async (name, id) => {
    const command = 'UPDATE products SET name = ? WHERE id = ?';
    const [{ affectedRows }] = await connection.execute(command, [name, id]);
    return affectedRows;
};

module.exports = { getAll, findById, createProduct, updateProduct };