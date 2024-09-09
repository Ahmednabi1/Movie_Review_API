const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1] || req.query.token || req.body.token;
    
    if (!token) {
        return res.status(401).json({ error: 'Access Denied: No Token Provided' });
    }

    try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid Token' });
    }
};

module.exports = authenticateJWT;



