require('dotenv').config();

const mysql = require('mysql2/promise');

const connectMySQL = async () => {
    try {
        console.log('MYSQL_HOST:', process.env.MYSQL_HOST);
        console.log('MYSQL_USER:', process.env.MYSQL_USER);
        console.log('MYSQL_PASSWORD:', process.env.MYSQL_PASSWORD);
        console.log('MYSQL_DATABASE:', process.env.MYSQL_DATABASE);

        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });
        console.log('MySQL connected');
        return connection;
    } catch (error) {
        console.error('MySQL connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectMySQL;
