// === server.js (Backend Node.js Server) ===

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mlggiveaway', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema and model
const Entry = mongoose.model('Entry', {
  name: String,
  email: String,
  uid: String
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve frontend

// Handle form submissions
app.post('/submit', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await Entry.create({ name, email, uid: message });
    res.send('🎉 Submission received!');
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Error saving data.');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});