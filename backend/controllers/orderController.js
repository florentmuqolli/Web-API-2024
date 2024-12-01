const connectMySQL = require('../config/mysql');

exports.createOrder = async (req, res) => {
    try {
        const connection = await connectMySQL();
        const { userId, productId, quantity, totalPrice } = req.body;

        const [result] = await connection.execute(
            'INSERT INTO orders (user_id, product_id, quantity, total_price) VALUES (?, ?, ?, ?)',
            [userId, productId, quantity, totalPrice]
        );

        res.status(201).json({ message: 'Order created', orderId: result.insertId });
    } catch (error) {
        console.error('Create Order Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
