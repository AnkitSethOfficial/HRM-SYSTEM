const Attendance = require('../models/Attendance');

// Helper function to get today's date in YYYY-MM-DD format
const getTodayString = () => {
  return new Date().toISOString().split('T')[0];
};

// Helper function to get the current time (e.g., "14:30:00")
const getCurrentTime = () => {
  return new Date().toLocaleTimeString('en-US', { hour12: false });
};

// 1. CLOCK IN
const clockIn = async (req, res) => {
  try {
    const today = getTodayString();
    
    // Check if the user already has an attendance record for today
    const existingRecord = await Attendance.findOne({ 
      userId: req.user.id, 
      date: today 
    });

    if (existingRecord) {
      return res.status(400).json({ message: 'You have already clocked in today.' });
    }

    // Create a new attendance record
    const newAttendance = new Attendance({
      userId: req.user.id,
      date: today,
      clockInTime: getCurrentTime(),
      status: 'Present'
    });

    await newAttendance.save();
    res.status(201).json({ message: 'Clocked in successfully!', record: newAttendance });

  } catch (error) {
    res.status(500).json({ message: 'Server error during clock in', error: error.message });
  }
};

// 2. CLOCK OUT
const clockOut = async (req, res) => {
  try {
    const today = getTodayString();

    // Find today's record for this specific user
    const record = await Attendance.findOne({ 
      userId: req.user.id, 
      date: today 
    });

    if (!record) {
      return res.status(404).json({ message: 'No clock-in record found for today. Please clock in first.' });
    }

    if (record.clockOutTime) {
      return res.status(400).json({ message: 'You have already clocked out today.' });
    }

    // Update the record with the current time
    record.clockOutTime = getCurrentTime();
    await record.save();

    res.status(200).json({ message: 'Clocked out successfully!', record });

  } catch (error) {
    res.status(500).json({ message: 'Server error during clock out', error: error.message });
  }
};

// 3. GET MY ATTENDANCE HISTORY
const getMyAttendance = async (req, res) => {
  try {
    // Find all records for this user, sorted by date (newest first)
    const records = await Attendance.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching attendance', error: error.message });
  }
};

module.exports = { clockIn, clockOut, getMyAttendance };