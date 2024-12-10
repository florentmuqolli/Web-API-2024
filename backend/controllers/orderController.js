const connectMySQL = require('../config/mysql');
const User = require('../models/user');

exports.createOrder = async (req, res) => {
    try {
        const connection = await connectMySQL();
        const { userId, productId, quantity, totalPrice } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found in MongoDB' });
        }

        console.log('Received Data:', { userId, productId, quantity, totalPrice });

        if (userId === undefined || productId === undefined || quantity === undefined || totalPrice === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const [result] = await connection.execute(
            'INSERT INTO orders (user_id, product_id, quantity, total_price) VALUES (?, ?, ?, ?)',
            [userId, productId, quantity, totalPrice]
        );

        console.log('Order Created Successfully:', result);
        res.status(201).json({ message: 'Order created', orderId: result.insertId });
    } catch (error) {
        console.error('Create Order Error:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const connection = await connectMySQL();
        const [orders] = await connection.execute('SELECT id, user_id, product_id, quantity, total_price FROM orders');
        console.log('Fetched Orders:', orders);
        res.status(200).json(orders);
    } catch (error) {
        console.error('Get Orders Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { productId, quantity, totalPrice } = req.body;

        const connection = await connectMySQL();
        const [result] = await connection.execute(
            'UPDATE orders SET product_id = ?, quantity = ?, total_price = ? WHERE id = ?',
            [productId, quantity, totalPrice, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order updated successfully' });
    } catch (error) {
        console.error('Update Order Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const connection = await connectMySQL();

        const [order] = await connection.execute('SELECT * FROM orders WHERE id = ?', [id]);

        if (order.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const [result] = await connection.execute('DELETE FROM orders WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Failed to delete order' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Delete Order Error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

