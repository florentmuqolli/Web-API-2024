require('dotenv').config({ path: '../.env' });


console.log(process.env.MYSQL_HOST); 
console.log(process.env.MYSQL_USER); 
console.log(process.env.MYSQL_PASSWORD); 
console.log(process.env.MYSQL_DATABASE);

const { pool } = require('../config/mysql');

const createProdTable = async () => {
    try {
        const createTableQuery = `
            ALTER TABLE products
            ADD COLUMN type VARCHAR(50) NOT NULL;
        `;

        await pool.execute(createTableQuery);
        console.log('Products table created successfully');
    } catch (error) {
        console.error('Error creating Products table:', error.message);
    }
};

createProdTable();
