const express = require('express');
const { clockIn, clockOut, getMyAttendance } = require('../controllers/attendanceController');
const { protect } = require('../middleware/authMiddleware'); // Import the bouncer

const router = express.Router();

// All these routes are protected! You must have a valid token to use them.
router.post('/clock-in', protect, clockIn);
router.put('/clock-out', protect, clockOut);
router.get('/my-history', protect, getMyAttendance);

module.exports = router;