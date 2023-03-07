const express = require('express');
const { handleRegisterUser } = require('../controlers/authControler');

const Router = express.Router();

Router.post('/register', handleRegisterUser);

module.exports = Router;