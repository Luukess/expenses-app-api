require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/config');

const app = express();
connectDB();

app.use(bodyParser.json());

app.use('/api', require('./routes/heartRoute'));
app.use('/api/users', require('./routes/authRoutes'));

app.listen(process.env.PORT, () => {
    console.log('Server started');
});