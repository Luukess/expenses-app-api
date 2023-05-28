const mongoose = require('mongoose');

const walletModel = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    value: {
        type: Number,
        require: true
    },
    unit: {
        type: String,
        uppercase: true,
        require: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('wallets', walletModel);