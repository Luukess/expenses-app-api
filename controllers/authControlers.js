const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Token = require('../models/tokenModel');
const jwt = require('jsonwebtoken');
const { handleRegisterValidation } = require('../utils/registerValidation');
const { handleLoginValidation } = require('../utils/loginValidation');
const { handleGenerateAccessToken, handleGenerateRefreshToken } = require('../utils/generateToken');

// @desc Register new user
// @route POST /api/auth/register
// @access Public

const handleRegisterUser = async (req, res) => {
    const { userName, email, password, confirmRegulation } = req.body;
    try {
        const validation = await handleRegisterValidation(userName, email, password, confirmRegulation);
        const isUserExist = await User.findOne({ email: email });

        if (isUserExist) {
            res.status(409).send({ message: 'There is already an account with this email' });
        } else {
            if (!validation.error) {
                const hashedPassword = await bcrypt.hash(password, 10);
                const handleAddUser = await User.create({ userName: userName, email: email, password: hashedPassword, confirmRegulation: confirmRegulation });
                res.status(201).send({ message: 'Registration completed successfully' });
            };
        };

    } catch (e) {
        const { error, message } = e;
        if (error || e.errors) {
            res.status(400).send({ message });
        } else {
            res.status(500).send({ message: 'Problem connecting to the server' });
        };
    };
};

// @desc log in to app
// @route POST /api/auth/login
// @access Public

const handleLoginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const getUser = await User.findOne({ email: email }).catch(() => res.status(500).json({ message: 'Problem with connection' }));
        const validation = await handleLoginValidation(email, password, getUser);
        if (!validation.error) {
            const { password, ...restUserObj } = getUser._doc;
            const accessToken = handleGenerateAccessToken(restUserObj);
            const refreshToken = handleGenerateRefreshToken(restUserObj);
            const saveRefreshToken = await Token.create({ token: refreshToken }).catch(() => res.status(500).json({ message: 'Problem with connection' }))
            res.json({ accessToken, refreshToken });
        }
    } catch (e) {
        const { error } = e;
        if (error || e.errors) {
            res.status(404).send();
        } else {
            res.status(500).json({ message: 'Problem connecting to the server' });
        };
    };
};

// @desc log out from app
// @route DELETE /api/auth/logout
// @access Private

const handleLogOutUser = async (req, res) => {
    const { token } = req.body;
    try {
        const getRefToken = await Token.findOne({ token: token });
        if (!token) res.status(400).json({ message: 'Incorrect body' });
        if (!getRefToken) {
            res.status(400).json({ message: 'Log out failed' });
        } else {
            await Token.deleteOne({ _id: getRefToken._id });
            res.status(200).json({ message: 'Successful logout' });
        };
    } catch (e) {
        const { error } = e;
        if (error || e.errors) {
            res.status(400).json({ message: 'Log out failed' });
        } else {
            res.status(500).json({ message: 'Problem connecting to the server' });
        };
    };
};

// @desc refresh token
// @route POST /api/auth/token
// @access Private

const handleRefreshToken = async (req, res) => {
    const { token } = req.body;

    if (!token) res.status(401).send();
    const checkToken = await Token.findOne({ token: token });
    if (!checkToken) res.status(403).send();

    jwt.verify(checkToken.token, process.env.SECRET_KEY_R_TOKEN, (error, user) => {
        if (error) res.status(403).json({ message: 'authorization denied' });
        const accessToken = handleGenerateAccessToken(user);
        res.status(200).json({ accessToken: accessToken });
    });
};

module.exports = {
    handleRegisterUser,
    handleLoginUser,
    handleLogOutUser,
    handleRefreshToken
};