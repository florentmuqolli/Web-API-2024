require('dotenv').config();

console.log(process.env.MYSQL_HOST); 
console.log(process.env.MYSQL_USER); 
console.log(process.env.MYSQL_PASSWORD); 
console.log(process.env.MYSQL_DATABASE);

const connectMySQL = require('../config/mysql');

const createOrdersTable = async () => {
    try {
        const connection = await connectMySQL();

        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS orders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                product_id INT NOT NULL,
                quantity INT NOT NULL,
                total_price DECIMAL(10, 2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            );
        `;

        await connection.execute(createTableQuery);
        console.log('Orders table created successfully');

        connection.end();
    } catch (error) {
        console.error('Error creating Orders table:', error.message);
    }
};

createOrdersTable();
