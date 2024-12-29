require('dotenv').config({ path: '../.env' });

console.log(process.env.MYSQL_HOST);
console.log(process.env.MYSQL_USER);
console.log(process.env.MYSQL_PASSWORD);
console.log(process.env.MYSQL_DATABASE);

const { pool } = require('../config/mysql');

const createContactTable = async () => {
    try {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS contact_messages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                subject VARCHAR(255) NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        await pool.execute(createTableQuery);
        console.log('Contact Messages table created successfully');
    } catch (error) {
        console.error('Error creating Contact Messages table:', error.message);
    }
};

createContactTable();

{/*const alterContactTable = async () => {
    try {
        const alterTableQuery = `
            ALTER TABLE contact_messages
            ADD COLUMN status ENUM('pending', 'done') DEFAULT 'pending';
        `;

        await pool.execute(alterTableQuery);
        console.log('Contact Messages table updated successfully');
    } catch (error) {
        console.error('Error updating Contact Messages table:', error.message);
    }
};

alterContactTable(); */}
