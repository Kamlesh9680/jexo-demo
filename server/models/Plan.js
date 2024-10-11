const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  outcomes: { type: String, required: true },
  validity: { type: Number, default: 75 }, // 75 days validity
});

module.exports = mongoose.model('Plan', PlanSchema);
