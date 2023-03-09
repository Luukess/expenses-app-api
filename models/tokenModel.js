const mongoose = require('mongoose');

const tokenModel = mongoose.Schema({
    token: {
        type: String,
        require: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('tokens', tokenModel);