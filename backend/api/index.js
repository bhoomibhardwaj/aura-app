const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Aura API is working on Vercel!' });
});

// Signup
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    res.json({ message: 'Signup successful', name, email });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Signin
app.post('/api/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    res.json({ message: 'Signin successful', email });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Correct export for Vercel
module.exports = app;