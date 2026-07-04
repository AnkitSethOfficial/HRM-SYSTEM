const User = require('../models/User');

// GET A USER's PROFILE
// This route will be protected, so we already know who the user is via req.user.id
const getUserProfile = async (req, res) => {
  try {
    // Search the database for the ID attached by our authMiddleware
    // We use .select('-password') so we don't accidentally send the hashed password to the frontend
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching profile', error: error.message });
  }
};

module.exports = { getUserProfile };