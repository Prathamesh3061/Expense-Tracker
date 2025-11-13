const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:3000", 
    "https://expense-tracker-sepia-mu.vercel.app"
  ],
  credentials: true
})); // Allows requests from frontend
app.use(express.json()); // Allows us to accept JSON data in the body

// --- API Routes ---

// Default route
app.get('/', (req, res) => {
  res.send('Expense Tracker API is running...');
});

// User & Auth Routes
app.use('/api/users', require('./routes/userRoutes'));

// Transaction Routes
app.use('/api/transactions', require('./routes/transactionRoutes'));


// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});