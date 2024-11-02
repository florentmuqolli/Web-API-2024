const roleMiddleware = (roles) => {
    return (req, res, next) => {

        console.log('Role Middleware called');
        
        if (req.user && roles.includes(req.user.role)) {
            next();
        } else {
            console.log('Access denied');
            return res.status(403).json({ message: 'Qasje e ndaluar' }); 
        }
    };
};
module.exports = roleMiddleware;