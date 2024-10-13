const express = require('express');
const router = express.Router();


router.post('/api/purchase-vip', async (req, res) => {
    const { userId, vipLevel, price } = req.body;

    // Simulate the start of a Tether (USDT) payment
    try {
        // Trigger the payment gateway for Tether (integrate real payment API here)
        const transactionId = await initiateTetherPayment(userId, price); // function to integrate with the payment provider

        // Create a new payment record in MongoDB
        const newPayment = new UserPayment({
            userId,
            vipLevel,
            price,
            transactionId,
            status: 'pending', // Initial status
            paymentMethod: 'Tether'
        });

        await newPayment.save();

        // Respond with transaction details
        res.json({ success: true, transactionId, message: 'Payment initiated. Awaiting confirmation.' });
    } catch (error) {
        console.error('Payment initiation error:', error);
        res.status(500).json({ success: false, message: 'Error initiating payment' });
    }
});

router.post('/api/payment-webhook', async (req, res) => {
    const { txn_id, status } = req.body;

    if (status === '100') { // Payment success code for CoinPayments
        const payment = await UserPayment.findOneAndUpdate(
            { transactionId: txn_id },
            { status: 'success' }
        );
        if (payment) {
            res.json({ success: true, message: 'Payment confirmed.' });
        } else {
            res.status(404).json({ success: false, message: 'Payment record not found.' });
        }
    } else {
        res.status(400).json({ success: false, message: 'Payment failed or pending.' });
    }
});

router.get('/api/check-payment-status/:transactionId', async (req, res) => {
    const { transactionId } = req.params;
    const payment = await UserPayment.findOne({ transactionId });

    if (payment) {
        res.json({ success: true, status: payment.status });
    } else {
        res.status(404).json({ success: false, message: 'Payment not found' });
    }
});


module.exports = router;