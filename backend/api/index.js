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
  // ... your signup logic
  res.json({ message: 'Signup successful' });
});

// Signin
app.post('/api/auth/signin', async (req, res) => {
  // ... your signin logic
  res.json({ message: 'Signin successful' });
});

export default app;