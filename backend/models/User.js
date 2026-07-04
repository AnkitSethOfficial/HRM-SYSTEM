const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  loginId: { 
    type: String, 
    required: true, 
    unique: true // The auto-generated ID (e.g., OIJODO20260001)
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['Admin', 'HR', 'Employee'], 
    default: 'Employee' 
  },
  personalDetails: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    profilePicture: { type: String, default: '' }
  },
  financials: {
    fixedWage: { type: Number, default: 0 },
    bankName: { type: String, default: '' },
    accountNumber: { type: String, default: '' },
    ifscCode: { type: String, default: '' }
  },
  yearOfJoining: {
    type: String,
    required: true
  }
}, { timestamps: true }); 

module.exports = mongoose.model('User', userSchema);