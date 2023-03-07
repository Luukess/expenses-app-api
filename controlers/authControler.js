const { handleRegisterValidation } = require('../utils/registerValidation');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

// @desc Register new user
// @route GET /api/users/register
// @access Public

const handleRegisterUser = async (req, res) => {
    const { userName, email, password, confirmRegulation } = req.body;
    try {
        const validation = await handleRegisterValidation(userName, email, password, confirmRegulation);

        if (!validation.error) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const handleAddUser = await User.create({ userName: userName, email: email, password: hashedPassword, confirmRegulation: confirmRegulation });
            res.status(201).send({ message: 'Registration completed successfully' });
        };

    } catch (e) {
        const { error, message } = e;
        if (error || e.errors) {
            res.status(400).send({ message });
        } else {
            res.status(500).send({ mesage: 'Problem connecting to the server' });
        };
    };
};

module.exports = {
    handleRegisterUser,
}