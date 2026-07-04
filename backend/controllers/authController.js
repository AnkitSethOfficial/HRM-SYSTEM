const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. REGISTER A NEW EMPLOYEE
const registerUser = async (req, res) => {
  try {
    const { email, password, role, personalDetails, financials, yearOfJoining } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // ID GENERATOR LOGIC
    const currentYear = new Date().getFullYear().toString(); // Gets "2026"
    
    // Find the last created user to increment the ID
    const lastUser = await User.findOne().sort({ createdAt: -1 });
    let newSequence = "0001";
    
    if (lastUser && lastUser.loginId.includes(currentYear)) {
      // Extract the last 4 digits and add 1
      const lastSequence = parseInt(lastUser.loginId.slice(-4));
      newSequence = (lastSequence + 1).toString().padStart(4, '0');
    }
    
    const generatedLoginId = `OIJODO${currentYear}${newSequence}`;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const newUser = new User({
      loginId: generatedLoginId,
      email,
      password: hashedPassword,
      role,
      personalDetails,
      financials,
      yearOfJoining
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', loginId: generatedLoginId });

  } catch (error) {
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
};

// 2. LOGIN AN EXISTING EMPLOYEE
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' } // Token expires in 1 day
    );

    res.status(200).json({ 
      message: 'Login successful', 
      token, 
      user: { loginId: user.loginId, role: user.role, name: user.personalDetails.firstName } 
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};

module.exports = { registerUser, loginUser };