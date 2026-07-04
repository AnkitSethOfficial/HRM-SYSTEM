const express = require('express');
const { getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // Import the bouncer

const router = express.Router();

// Notice how 'protect' sits in the middle? 
// The request must pass 'protect' before it is allowed to reach 'getUserProfile'
router.get('/me', protect, getUserProfile);

module.exports = router;