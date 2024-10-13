const mongoose = require('mongoose');

const userPaymentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    memberpoint: { type: Number, default: 0 },
    vipLevel: String,
    price: Number,
    transactionId: String,
    status: String, // success or pending
    paymentMethod: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserPayment', userPaymentSchema);
