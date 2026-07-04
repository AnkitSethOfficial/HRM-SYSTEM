const express = require('express');
const { submitRequest, getMyRequests } = require('../controllers/timeOffController');
const { protect } = require('../middleware/authMiddleware'); // Import the bouncer

const router = express.Router();

// Both routes are protected so only logged-in employees can use them
router.post('/request', protect, submitRequest);
router.get('/my-requests', protect, getMyRequests);

module.exports = router;