require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0
});

const connectMySQL = async () => {
    try {
        // Test connection
        const [rows] = await pool.query('SELECT 1');
        console.log('MySQL pool connected');
        return pool; 
    } catch (error) {
        console.error('MySQL pool connection error:', error.message);
        process.exit(1);
    }
};

const closePool = () => {
    pool.end((err) => {
        if (err) {
            console.error('Error closing pool:', err);
        } else {
            console.log('MySQL connection pool closed.');
        }
    });
};

module.exports = {
    pool,
    connectMySQL,
    closePool
};
