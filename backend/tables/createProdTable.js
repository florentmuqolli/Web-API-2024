require('dotenv').config({ path: '../.env' });


console.log(process.env.MYSQL_HOST); 
console.log(process.env.MYSQL_USER); 
console.log(process.env.MYSQL_PASSWORD); 
console.log(process.env.MYSQL_DATABASE);

const { pool } = require('../config/mysql');

const createProdTable = async () => {
    try {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS products (
                productID INT PRIMARY KEY AUTO_INCREMENT,
                productName VARCHAR(255) NOT NULL,
                description TEXT,
                price DECIMAL(10, 2) NOT NULL,
                category VARCHAR(100),
                imageURL VARCHAR(255)
            );
        `;

        await pool.execute(createTableQuery);
        console.log('Products table created successfully');
    } catch (error) {
        console.error('Error creating Products table:', error.message);
    }
};

createProdTable();
