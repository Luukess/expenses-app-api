const express = require('express');
const { handleRegisterUser, handleLoginUser, handleLogOutUser } = require('../controllers/authControlers');

const Router = express.Router();

Router.post('/register', handleRegisterUser);
Router.post('/login', handleLoginUser);
Router.delete('/logout', handleLogOutUser);

module.exports = Router;