const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const userRoutes = require('./Routes/UserRoutes'); // Assuming userRoutes.js is in src/routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

// Routes
app.use('/api/users/', userRoutes);

// MongoDB connection string
const connectionString = process.env.CONNECTION_STRING;

mongoose.connect(connectionString)
  .then(() => console.log("Database connected"))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const port = 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));