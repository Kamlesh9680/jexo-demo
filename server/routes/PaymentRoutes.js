const express = require('express');
const router = express.Router();
const axios = require('axios');

// In your backend route (e.g., payment.js)
router.post('/create-payment', async (req, res) => {
    try {
        const { amount, currency, userId, vipLevel } = req.body;

        const response = await axios.post(`${CRYPTOMUS_API_URL}/create_payment`, {
            amount,
            currency,
            order_id: crypto.randomBytes(12).toString("hex")
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        // Assuming Cryptomus returns a payment URL in the response
        res.json({ success: true, paymentUrl: response.data.paymentUrl, transactionId: response.data.transactionId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error creating payment' });
    }
});

// Assuming you have a route for checking payment status
router.get('/check-payment-status/:transactionId', async (req, res) => {
    const { transactionId } = req.params;

    try {
        const response = await axios.get(`${CRYPTOMUS_API_URL}/payment_status/${transactionId}`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        res.json({ success: true, status: response.data.status });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching payment status' });
    }
});


module.exports = router;