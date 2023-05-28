const express = require('express');
const { handleGetWallets } = require('../controllers/walletsControler');

const Router = express.Router();

Router.get('/wallets', handleGetWallets);

module.exports = Router;