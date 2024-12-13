const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyToken, getStatus } = require('../controllers/auth');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/status', (req, res) => {
    console.log('Status route hit');
    console.log('Cookies:', req.cookies);
    if (!req.cookies.authToken) {
        return res.status(403).json({ message: 'Token not found.' });
    }
    verifyToken(req, res, () => {
        getStatus(req, res);
    });
});

router.post('/logout', (req, res) => {
    res.clearCookie('authToken'); 
    res.clearCookie('userRole');
    return res.status(200).json({ message: 'Logged out successfully' });
});

router.get('/secure-endpoint', verifyToken, (req, res) => {
    res.json({ message: 'You are authorized!' });
});

router.get('/admin', authMiddleware, roleMiddleware(['admin']), (req, res) => {
    console.log('Admin route accessed');
    res.status(200).json({ message: 'Welcome Admin!' });
});

router.get('/employee', authMiddleware, roleMiddleware(['employee', 'admin']), (req, res) => {
    res.status(200).json({ message: 'Welcome Employee or Admin!' });
});

router.get('/owner', authMiddleware, roleMiddleware(['owner']), (req, res) => {
    res.status(200).json({ message: 'Welcome Owner!' });
});

module.exports = router;
