const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
  rating: { type: Number, required: true }, // Rating given for the gift box
  reward: { type: String, required: true }, // The outcome based on rating
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Record', RecordSchema);
