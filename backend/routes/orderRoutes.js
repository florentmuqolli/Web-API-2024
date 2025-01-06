const express = require('express');
const { createOrder, getOrders, getOrdersByUser, updateOrder, deleteOrder } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createOrder); 
router.get('/', authMiddleware, getOrders); 
router.get('/:id', authMiddleware, getOrdersByUser);
router.put('/:id', authMiddleware, updateOrder);
router.delete('/:id', authMiddleware, deleteOrder);

module.exports = router;
