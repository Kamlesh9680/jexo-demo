const Record = require('../models/Record');
const User = require('../models/User');
const Plan = require('../models/Plan');

// Create a new record
const createRecord = async (req, res) => {
  const { userId, planId, rating, reward } = req.body;

  try {
    const user = await User.findById(userId);
    const plan = await Plan.findById(planId);

    const record = new Record({ user, plan, rating, reward });
    await record.save();

    res.json(record);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Get all records for a user
const getUserRecords = async (req, res) => {
  const { userId } = req.params;

  try {
    const records = await Record.find({ user: userId }).populate('plan');
    res.json(records);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

module.exports = { createRecord, getUserRecords };
