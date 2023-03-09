const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Token = require('../models/tokenModel');
const { handleRegisterValidation } = require('../utils/registerValidation');
const { handleLoginValidation } = require('../utils/loginValidation');
const { handleGenerateAccessToken, handleGenerateRefreshToken } = require('../utils/generateToken');

// @desc Register new user
// @route POST /api/users/register
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
// @route POST /api/users/login
// @access Public

const handleLoginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const getUser = await User.findOne({ email: email }).catch(() => res.status(500).json({ message: 'Problem with connection' }));
        const validation = await handleLoginValidation(email, password, getUser);
        if (!validation.error) {
            const {password, ...restUserObj} = getUser._doc;
            const accessToken = handleGenerateAccessToken(restUserObj);
            const refreshToken = handleGenerateRefreshToken(restUserObj);
            const saveRefreshToken = await Token.create({token: refreshToken}).catch(() => res.status(500).json({message: 'Problem with connection'}))
            res.json({accessToken, refreshToken});
        }
    } catch (e) {
        const { error, message } = e;
        if(error || e.errors){
            res.status(400).json({message});
        }else{
            res.status(500).json({message: 'Problem connecting to the server'});
        };
    };
};

module.exports = {
    handleRegisterUser,
    handleLoginUser
}