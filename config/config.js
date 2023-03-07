const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.DB_URI, {dbName: process.env.DB_NAME});
        console.log('Connect');
    }catch(e){
        console.log(e);
    };
};

module.exports = connectDB;