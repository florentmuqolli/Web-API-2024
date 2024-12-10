const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    console.log('Auth Middleware called');
    
    if (!token) {
        return res.status(401).json({ message: 'Token nuk është i dhënë' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        console.log('Token decoded:', req.user);
        next(); 
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Tokeni ka skaduar, identifikohuni prapë' });
        }
        return res.status(403).json({ message: 'Token i pavlefshëm' });
    }
};

module.exports = authMiddleware;