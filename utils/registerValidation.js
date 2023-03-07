const emailValidator = require('email-validator');

const handleRegisterValidation = (userName, email, password, confirmRegulation) => {
    return new Promise((res, rej) => {

        const validEmail = emailValidator.validate(email);

        if (userName.length < 4) {
            rej({ error: true, message: 'User name is to short, minimum 4 characters' });
        };

        if (!validEmail) {
            rej({ error: true, message: 'Incorrect email' });
        };

        if (password.length < 6) {
            rej({ error: true, message: 'Password is to short, minimum 6 characters' });
        };

        if (!confirmRegulation) {
            rej({ error: true, message: 'Please confirm regulations' });
        };

        res({ error: false, message: 'Data passed validation' });
    });
};

module.exports = {
    handleRegisterValidation
}