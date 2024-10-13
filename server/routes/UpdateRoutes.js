const express = require('express');
const router = express.Router();
const userPaymentSchema = require('../models/UserPayments');
const userDailyInfo = require('../models/userDailyInfo');

router.post('/update-earnings', async (req, res) => {
  const { userId, earnings } = req.body;

  try {
    const result = await userPaymentSchema.updateOne(
      { userId: userId },
      { $inc: { memberpoint: earnings } }
    );

    // If no user record found, create a new one
    if (result.matchedCount === 0) {
      const newUserPayment = new userPaymentSchema({
        userId: userId,
        memberpoint: earnings,
      });

      await newUserPayment.save();

      return res.status(201).send('User record created and earnings set successfully!');
    }

    const updatedDailyInfo = await userDailyInfo.updateOne(
      { userId: userId },
      { $inc: { rateCount: 1 } }, // Increment rateCount by 1
      { new: true }
    );

    if (updatedDailyInfo.matchedCount === 0) {
      const newupdatedDailyInfo = new userDailyInfo({
        userId: userId,
        rateCount: 1,
      });

      await newupdatedDailyInfo.save();

      return res.status(201).send('User record created and earnings set successfully!');
    }

    res.status(200).send('Earnings updated successfully!');
  } catch (error) {
    console.error('Error updating earnings:', error);
    res.status(500).send('Error updating earnings');
  }
});

router.get('/ratings/today/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the userDailyInfo document for the given userId
    const userRateCount = await userDailyInfo.findOne({ userId: userId });

    console.log(userRateCount)
    // Check if userDailyInfo exists
    if (!userRateCount) {
      return res.status(404).json({ message: 'User daily info not found.' });
    }

    // Return the rateCount
    res.status(200).json({ rateCount: userRateCount.rateCount });
  } catch (error) {
    console.error('Error fetching today\'s ratings:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

router.get('/memberpoint/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const userPayment = await userPaymentSchema.findOne({ userId }); // Find the user payment document
    console.log("User payment", userPayment)

    if (!userPayment) {
      return res.status(404).json({ message: 'User payment not found' });
    }

    res.json({ memberPoint: userPayment.memberpoint });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
