const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { fal } = require("@fal-ai/client");
require('dotenv').config();

const app = express();

// Configure Fal.ai
fal.config({
  credentials: process.env.FAL_AI_API_KEY
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Temporary in-memory storage
let users = [];

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Aura API is working!' });
});

// Signup route
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
      subscription: 'free',
      credits: 5
    };
    
    users.push(user);
    const token = jwt.sign({ userId: user.id }, 'mysecretkey');
    
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        subscription: user.subscription,
        credits: user.credits
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Signin route
app.post('/api/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user.id }, 'mysecretkey');
    
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        subscription: user.subscription,
        credits: user.credits
      }
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ========== AI GENERATION ROUTE WITH FAL.AI ==========
app.post('/api/generations/generate', async (req, res) => {
  try {
    const { imageUrl, filter, preserveFace } = req.body;
    
    console.log('🎨 AI Generation started...');
    console.log('   Filter:', filter);
    
    const prompts = {
      'Old Money': 'luxury elegant portrait, premium aesthetic, high fashion photography, refined style',
      'Korean Drama': 'korean drama style, soft dreamy lighting, romantic atmosphere, glass skin',
      'Soft Glow': 'soft golden hour lighting, dreamy warm tones, gentle glow, ethereal beauty',
      'Cinematic Rain': 'cinematic rainy atmosphere, moody lighting, emotional depth, film grain',
      'Dark Academia': 'dark academia, vintage library warm tones, scholarly elegant aesthetic',
      'Y2K': 'y2k aesthetic, early 2000s digital camera style, cyber nostalgic',
      'Luxury Vacation': 'luxury resort golden hour, vacation editorial, premium travel aesthetic',
      'Vogue Editorial': 'vogue magazine editorial, high fashion, dramatic studio lighting',
      'Bollywood Glow': 'bollywood cinematic, vibrant colors, golden dramatic lighting',
      'Night Drive': 'night drive, neon reflections, moody urban cinematic',
      'Retro Film': 'vintage kodachrome film, 1970s aesthetic, authentic grain',
      'Pinterest Café': 'cozy cafe aesthetic, warm coffee shop, hygge atmosphere'
    };
    
    const prompt = prompts[filter] || 'beautiful aesthetic portrait, cinematic lighting';
    const negativePrompt = 'deformed, distorted face, ugly, plastic, artificial, bad anatomy';
    
    console.log('   Calling Fal.ai API...');
    console.log('   Prompt:', prompt);
    
    // Using Fal.ai SDXL model
    const result = await fal.subscribe("fal-ai/flux/schnell", {
      input: {
        prompt: prompt + ", high quality, realistic, professional photo",
        negative_prompt: negativePrompt,
        image_size: "square_hd",
        num_images: 1,
        safety_checker: false,
        enable_safety_checker: false
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          console.log("   Generation in progress...");
        }
      },
    });
    
    console.log('✅ AI Generation successful!');
    
    res.json({
      success: true,
      message: `✨ Successfully applied ${filter} filter!`,
      enhancedImage: result.data.images[0].url,
      filter: filter,
      preserveFace: preserveFace
    });
    
  } catch (error) {
    console.error('❌ Generation error:', error.message);
    res.status(500).json({ 
      success: false,
      error: 'AI Generation failed: ' + error.message
    });
  }
});

// Get current user route
app.get('/api/auth/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, 'mysecretkey');
    const user = users.find(u => u.id === decoded.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        subscription: user.subscription,
        credits: user.credits
      }
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Test API: http://localhost:${PORT}/api/test`);
  console.log(`🎨 AI Generation API: http://localhost:${PORT}/api/generations/generate`);
});