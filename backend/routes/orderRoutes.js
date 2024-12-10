const express = require('express');
const { createOrder, getOrders, updateOrder } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const connectMySQL = require('../config/mysql');
console.log('MySQL connection function imported:', connectMySQL);
const router = express.Router();

router.post('/', authMiddleware, createOrder); 

router.get('/', authMiddleware, getOrders); 

router.put('/:id', authMiddleware, updateOrder);

router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await connectMySQL();
        console.log('MySQL connection established:', connection);
        const [result] = await connection.execute('DELETE FROM orders WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Delete Order Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
