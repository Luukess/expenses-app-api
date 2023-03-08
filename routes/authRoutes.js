const express = require('express');
const { handleRegisterUser } = require('../controllers/authControler');

const Router = express.Router();

Router.post('/register', handleRegisterUser);

module.exports = Router;