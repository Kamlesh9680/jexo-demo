const mongoose = require('mongoose');

const userPaymentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    memberpoint: { type: Number, default: 0 },
    vipLevel: {type: String}
});

module.exports = mongoose.model('UserPayment', userPaymentSchema);
