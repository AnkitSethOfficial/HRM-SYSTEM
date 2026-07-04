// Import the necessary tools
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // This allows the server to read Developer 3's hidden .env file

// Initialize the Express application
const app = express();

// Set up middleware
app.use(cors()); // Allows the React frontend to securely talk to this backend
app.use(express.json()); // Allows the server to read JSON data sent from the frontend

// Define the port (defaults to 5000 if not found in .env)
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB Database');
    
    // Only start the server IF the database connects successfully
    app.listen(PORT, () => {
      console.log(`🚀 Backend Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed:', error.message);
  });

// A simple test route to ensure the API is listening
app.get('/', (req, res) => {
  res.send('HRMS Backend API is running!');
});