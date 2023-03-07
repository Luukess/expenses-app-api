const {handleRegisterValidation} = require('../utils/registerValidation');

// @desc Register new user
// @route GET /api/users/register
// @access Public

const handleRegisterUser = async (req, res) => {
    const { userName, email, password, confirmRegulation } = req.body;
    try {
        const validation = await handleRegisterValidation(userName, email, password, confirmRegulation);

        if(!validation.error){
            res.status(201).send('ok');
        };

    } catch (e) {
        const { error, message } = e;
        if(error){
            res.status(400).send({message});
        };
    };
};

module.exports = {
    handleRegisterUser,
}