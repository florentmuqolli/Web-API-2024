const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.authToken;

    //console.log('authMiddleware called');
    //console.log('Token from cookies:', req.cookies.authToken);
        if (!token) {
            console.log('Token nuk është i dhënë');
            return res.status(403).json({ message: 'No token provided' });
        }
    
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //console.log('Token decoded:', decoded);
            req.user = decoded; 
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Tokeni ka skaduar, identifikohuni prapë' });
            }
            return res.status(403).json({ message: 'Token i pavlefshëm' });
    }
};

module.exports = authMiddleware;