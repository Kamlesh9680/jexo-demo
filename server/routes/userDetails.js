// const express = require('express');
// const router = express.Router();
// const UserPayment = require('../models/UserPayments');
// const ensureAuthenticated = require('../middleware/ensureAuthenticated');

// // Route to get user details with JWT authentication
// router.get('/user-details', ensureAuthenticated, async (req, res) => {
//   try {
//     const userId = req.user._id; // Extracted from decoded token

//     // Fetch user VIP level from userPayments collection
//     const userPayment = await UserPayment.findOne({ userId });

//     if (!userPayment) {
//       return res.status(404).json({ message: 'User VIP level not found' });
//     }

//     res.json({
//       userId: userId,
//       userVIPLevel: userPayment.vipLevel,
//     });
//   } catch (error) {
//     console.error('Error fetching user details:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// module.exports = router;
