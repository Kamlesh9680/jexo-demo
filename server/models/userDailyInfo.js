const mongoose = require('mongoose');

const userDailyInfo = new mongoose.Schema({
    userId: { type: String, required: true },
    email: { type: String, unique: true },
    rateCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('userDailyInfo', userDailyInfo);
