require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/heartbeat', (req, res) => {
    const date = new Date();
    res.status(200).send(date);
});

app.listen(process.env.PORT, () => {
    console.log('Server started');
});