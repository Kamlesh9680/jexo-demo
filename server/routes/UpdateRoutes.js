const express = require('express');
const router = express.Router();
const userPaymentSchema = require('../models/UserPayments'); // Adjust the path as needed

router.post('/update-earnings', async (req, res) => {
  const { userId, earnings } = req.body;

  try {
    const result = await userPaymentSchema.updateOne(
      { userId: userId },
      { $inc: { memberpoint: earnings } }
    );

    // If no user record found, create a new one
    if (result.matchedCount  === 0) {
      const newUserPayment = new userPaymentSchema({
        userId: userId,
        memberpoint: earnings, // Initialize with the earnings
      });

      await newUserPayment.save();

      return res.status(201).send('User record created and earnings set successfully!');
    }

    res.status(200).send('Earnings updated successfully!');
  } catch (error) {
    console.error('Error updating earnings:', error);
    res.status(500).send('Error updating earnings');
  }
});

module.exports = router;
