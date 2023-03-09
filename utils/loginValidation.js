const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const handleLoginValidation = async (email, password, getUser) => {
    return new Promise((res, rej) => {
        const emailValidation = emailValidator.validate(email);

        if (!emailValidation) {
            rej({ error: true, message: 'Incorrect email' });
        };

        if (getUser !== null) {
            const comparePasswords = bcrypt.compare(password, getUser.password, (err, result) => {
                if (err || !result) rej({ error: true, message: 'Incorrect password' });
                if (result) res({ error: false, message: "Data passed validation" });
            });
        } else {
            rej({ error: true, message: 'Account does not exist' });
        };
    });
};

module.exports = {
    handleLoginValidation
};