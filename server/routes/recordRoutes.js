const express = require('express');
const { createRecord, getUserRecords } = require('../controllers/recordController');
const router = express.Router();

// Create a new transaction record
router.post('/create', createRecord);

// Get user transaction records
router.get('/:userId', getUserRecords);

module.exports = router;
