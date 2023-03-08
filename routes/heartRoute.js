const express = require('express');
const heart = require('../controllers/heartbeatControler');

const Router = express.Router();

Router.get('/heartbeat', heart);

module.exports = Router;