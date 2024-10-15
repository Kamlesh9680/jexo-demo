const mongoose = require('mongoose');

const userPaymentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    email: { type: String},
    memberpoint: { type: Number, default: 0 },
    ratingIncome: { type: Number, default: 0 },
    teamIncome: { type: Number, default: 0 },
    totalteamMembers: { type: Number, default: 0 },
    teamMemberData: {
      type: Map,
      of: Object 
    },
    vipLevel: String,
    price: Number,
    transactionId: String,
    status: String, 
    paymentMethod: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserPayment', userPaymentSchema);
