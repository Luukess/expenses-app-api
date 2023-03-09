const express = require('express');
const { handleRegisterUser, handleLoginUser } = require('../controllers/authControlers');

const Router = express.Router();

Router.post('/register', handleRegisterUser);
Router.post('/login', handleLoginUser);

module.exports = Router;