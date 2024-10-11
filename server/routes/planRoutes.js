const express = require('express');
const { getPlans } = require('../controllers/planController');
const router = express.Router();

// Get all VIP plans
router.get('/', getPlans);

module.exports = router;
