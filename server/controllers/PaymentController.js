const Coinpayments = require('coinpayments');

// CoinPayments setup (replace with your API keys)
const client = new Coinpayments({
  key: 'YOUR_API_KEY',
  secret: 'YOUR_API_SECRET'
});

async function initiateTetherPayment(userId, price) {
  const options = {
    currency1: 'USDT',  // Original currency (Tether)
    currency2: 'USDT',  // Target currency
    amount: price,
    buyer_email: 'user@example.com', // Replace with actual user email
    buyer_name: userId,  // You can pass the user ID here
    custom: userId, // Custom data
    ipn_url: 'http://localhost:5000/api/payment-webhook' // Webhook for payment confirmation
  };

  // Initiate payment request to CoinPayments
  const payment = await client.createTransaction(options);
  return payment.txn_id; // Return transaction ID
}
