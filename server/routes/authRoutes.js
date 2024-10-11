const express = require('express');
const { registerUser, loginUser, sendVerificationCode } = require('../controllers/authController');
const router = express.Router();

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Send Verification Code
router.post('/send-verification', sendVerificationCode);

module.exports = router;
