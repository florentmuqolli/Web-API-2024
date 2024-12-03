const express = require('express');
const { createOrder, getOrders, updateOrder } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createOrder); 

router.get('/', authMiddleware, getOrders); 

router.put('/:id', authMiddleware, updateOrder);

module.exports = router;
