require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/config');

const app = express();
app.use(cors());

connectDB();

app.use(bodyParser.json());

app.use('/api', require('./routes/heartRoute'));
app.use('/api/auth', require('./routes/authRoutes'));

app.listen(process.env.PORT, () => {
    console.log('Server started');
});