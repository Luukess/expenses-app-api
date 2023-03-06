require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use('/api', require('./routes/heartRoute'));

app.listen(process.env.PORT, () => {
    console.log('Server started');
});