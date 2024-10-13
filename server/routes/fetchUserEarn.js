const express = require('express');
const router = express.Router();
const userPaymentSchema = require('../models/UserPayments');

router.get('/api/memberpoint/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const userPayment = await userPaymentSchema.findOne({ userId }); 
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
