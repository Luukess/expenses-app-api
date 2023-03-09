const jwt = require('jsonwebtoken');

const handleGenerateAccessToken = (user) => {
    return jwt.sign(user, process.env.SECRET_KEY_A_TOKEN, { expiresIn: '15m' });
};

const handleGenerateRefreshToken = (user) => {
    return jwt.sign(user, process.env.SECRET_KEY_R_TOKEN);
};

module.exports = {
    handleGenerateAccessToken,
    handleGenerateRefreshToken
};