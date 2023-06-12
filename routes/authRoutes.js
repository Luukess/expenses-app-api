const express = require('express');
const { handleRegisterUser, handleLoginUser, handleLogOutUser, handleRefreshToken } = require('../controllers/authControlers');

const Router = express.Router();

Router.post('/register', handleRegisterUser);
Router.post('/login', handleLoginUser);
Router.delete('/logout', handleLogOutUser);
Router.post('/token', handleRefreshToken);

module.exports = Router;