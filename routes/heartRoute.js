const express = require('express');
const heart = require('../conrolers/heartbeatControler');

const Router = express.Router();

Router.get('/heartbeat', heart);

module.exports = Router;