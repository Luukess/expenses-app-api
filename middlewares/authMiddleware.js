const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === '' || token === undefined) {
        return res.status(401).json({ message: 'invalid authentication credentials for the requested resource' })
    };

    jwt.verify(token, process.env.SECRET_KEY_A_TOKEN, (error, user) => {
        if (error) return res.status(403).json({ message: 'authorization denied' });
        req.user = user;
        next();
    })
};

module.exports = {
    authMiddleware,
}