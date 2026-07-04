const TimeOff = require('../models/TimeOff');

// 1. SUBMIT A NEW LEAVE REQUEST
const submitRequest = async (req, res) => {
  try {
    // Extract the form data sent by the frontend
    const { leaveType, startDate, endDate, reason } = req.body;

    // Create the new request, attaching the logged-in user's ID securely
    const newRequest = new TimeOff({
      userId: req.user.id,
      leaveType,
      startDate,
      endDate,
      reason,
      status: 'Pending' // All new requests start as Pending
    });

    await newRequest.save();
    res.status(201).json({ message: 'Leave request submitted successfully!', request: newRequest });

  } catch (error) {
    res.status(500).json({ message: 'Server error submitting leave request', error: error.message });
  }
};

// 2. GET ALL MY LEAVE REQUESTS
const getMyRequests = async (req, res) => {
  try {
    // Find all requests belonging to this user, sorted by newest first
    const requests = await TimeOff.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(requests);

  } catch (error) {
    res.status(500).json({ message: 'Server error fetching leave requests', error: error.message });
  }
};

module.exports = { submitRequest, getMyRequests };