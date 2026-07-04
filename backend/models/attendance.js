const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  // This is the magic link that connects this attendance record to a specific employee in User.js
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: String, // Stored as 'YYYY-MM-DD'
    required: true
  },
  clockInTime: {
    type: String,
    default: null
  },
  clockOutTime: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Half-day'],
    default: 'Present'
  }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);