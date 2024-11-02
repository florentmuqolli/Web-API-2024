const express = require('express');
const { registerUser , loginUser  } = require('../controllers/auth'); // Import from auth.js
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Route for user registration
router.post('/register', registerUser );

// Route for user login
router.post('/login', loginUser );

router.get('/test', (req, res) => {
    console.log('Test route accessed');
    res.status(200).json({ message: 'Test route working' });
});

// Example of a protected route for admins
router.get('/admin', authMiddleware, roleMiddleware(['admin']), (req, res) => {
    console.log('Admin route accessed');
    res.status(200).json({ message: 'Welcome Admin!' });
});

// Example of a protected route for employees
router.get('/employee', authMiddleware, roleMiddleware(['employee', 'admin']), (req, res) => {
    res.status(200).json({ message: 'Welcome Employee or Admin!' });
});

// Example of a protected route for owners
router.get('/owner', authMiddleware, roleMiddleware(['owner']), (req, res) => {
    res.status(200).json({ message: 'Welcome Owner!' });
});

module.exports = router;